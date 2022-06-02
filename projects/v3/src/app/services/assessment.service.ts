import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RequestService } from 'request';
import { UtilsService } from '@v3/services/utils.service';
import { BrowserStorageService } from '@v3/services/storage.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApolloService } from './apollo.service';
import { ReviewRatingComponent } from '../components/review-rating/review-rating.component';
import { DemoService } from './demo.service';
import { environment } from '@v3/environments/environment';
import { FastFeedbackService } from './fast-feedback.service';

/**
 * @name api
 * @description list of api endpoint involved in this service
 * @type {Object}
 */
const api = {
  post: {
    todoitem: 'api/v2/motivations/todo_item/edit.json'
  }
};

export interface AssessmentSubmitParams {
  id: number;
  inProgress?: boolean;
  contextId?: number;
  reviewId?: number;
  submissionId?: number;
  unlock?: boolean;
}

export interface Assessment {
  id: number;
  name: string;
  type: string;
  description: string;
  isForTeam: boolean;
  dueDate?: string;
  isOverdue?: boolean;
  groups: Array<Group>;
  pulseCheck: boolean;
}

export interface Group {
  name: string;
  description: string;
  questions: Array<Question>;
}

export interface Question {
  id: number;
  name: string;
  type: string;
  fileType?: string;
  description: string;
  info?: string;
  isRequired: boolean;
  canComment: boolean;
  canAnswer: boolean;
  choices?: Array<Choice>;
  teamMembers?: Array<TeamMember>;
  audience: string[];
  submitterOnly?: boolean;
  reviewerOnly?: boolean;
}

export interface Choice {
  id: number;
  name: string;
  explanation?: string | any;
}

export interface TeamMember {
  key: string;
  userName: string;
}

export interface Submission {
  id: number;
  status: string;
  answers: any;
  submitterName: string;
  modified: string;
  isLocked: boolean;
  completed?: boolean;
  submitterImage: string;
  reviewerName: string | void;
}

export interface Answer {
  questionId: number;
  answer?: any;
  comment?: string;
}

export interface AssessmentReview {
  id: number;
  answers: any;
  status: string;
  modified: string;
}

@Injectable({
  providedIn: 'root'
})

export class AssessmentService {

  private _assessment$ = new BehaviorSubject<Assessment>(null);
  assessment$ = this._assessment$.pipe(shareReplay(1));
  private _submission$ = new BehaviorSubject<Submission>(null);
  submission$ = this._submission$.pipe(shareReplay(1));
  private _review$ = new BehaviorSubject<AssessmentReview>(null);
  review$ = this._review$.pipe(shareReplay(1));

  assessment: Assessment;
  questions = {};

  constructor(
    private request: RequestService,
    private utils: UtilsService,
    private storage: BrowserStorageService,
    private notificationService: NotificationsService,
    private fastFeedbackService: FastFeedbackService,
    public sanitizer: DomSanitizer,
    private apolloService: ApolloService,
    private demo: DemoService,
  ) {
    this.assessment$.subscribe(res => this.assessment = res);
  }

  clearAssessment() {
    this._assessment$.next(null);
  }

  getAssessment(id, action, activityId, contextId, submissionId?) {
    if (!this.assessment || this.assessment.id !== id) {
      this.clearAssessment();
    }
    if (environment.demo) {
      return this.demo.assessment(id).pipe(map(res => this._handleAssessmentResponse(res, action))).subscribe();
    }
    return this.apolloService.graphQLWatch(
      `query getAssessment($assessmentId: Int!, $reviewer: Boolean!, $activityId: Int!, $contextId: Int!, $submissionId: Int) {
        assessment(id:$assessmentId, reviewer:$reviewer, activityId:$activityId) {
          id name type description dueDate isTeam pulseCheck
          groups{
            name description
            questions{
              id name description type isRequired hasComment audience fileType
              choices{
                id name explanation description
              }
              teamMembers{
                userId userName teamId
              }
            }
          }
          submissions(id:$submissionId, contextId:$contextId) {
            id status completed modified locked
            submitter {
              name image
            }
            answers{
              questionId answer
            }
            review {
              id status modified
              reviewer { name }
              answers {
                questionId answer comment
              }
            }
          }
        }
      }`,
      {
        assessmentId: +id,
        reviewer: action === 'review',
        activityId: +activityId,
        submissionId: +submissionId || null,
        contextId: +contextId
      },
      {
        noCache: true
      }
    )
      .pipe(map(res => this._handleAssessmentResponse(res, action))).subscribe();
  }

  private _handleAssessmentResponse(res, action) {
    if (!res) {
      return null;
    }
    const assessment = this._normaliseAssessment(res.data, action);
    const submission = this._normaliseSubmission(res.data);
    const review = this._normaliseReview(res.data, action);
    this._assessment$.next(assessment);
    this._submission$.next(submission);
    this._review$.next(review);
    return {
      assessment,
      submission,
      review
    };
  }

  private _normaliseAssessment(data, action): Assessment {
    if (!data.assessment) {
      return null;
    }
    const assessment = {
      id: data.assessment.id,
      name: data.assessment.name,
      type: data.assessment.type,
      description: data.assessment.description,
      isForTeam: data.assessment.isTeam,
      dueDate: data.assessment.dueDate,
      isOverdue: data.assessment.dueDate ? this.utils.timeComparer(data.assessment.dueDate) < 0 : false,
      pulseCheck: data.assessment.pulseCheck,
      groups: []
    };
    data.assessment.groups.forEach(eachGroup => {
      const questions: Question[] = [];
      if (!eachGroup.questions) {
        return;
      }
      eachGroup.questions.forEach(eachQuestion => {
        this.questions[eachQuestion.id] = eachQuestion;
        const question: Question = {
          id: eachQuestion.id,
          name: eachQuestion.name,
          type: eachQuestion.type,
          description: eachQuestion.description,
          isRequired: eachQuestion.isRequired,
          canComment: eachQuestion.hasComment,
          canAnswer: action === 'review' ? eachQuestion.audience.includes('reviewer') : eachQuestion.audience.includes('submitter'),
          audience: eachQuestion.audience,
          submitterOnly: eachQuestion.audience.length === 1 && eachQuestion.audience.includes('submitter'),
          reviewerOnly: eachQuestion.audience.length === 1 && eachQuestion.audience.includes('reviewer')
        };
        switch (eachQuestion.type) {
          case 'oneof':
          case 'multiple':
            const choices: Choice[] = [];
            let info = '';
            eachQuestion.choices.forEach(eachChoice => {
              choices.push({
                id: eachChoice.id,
                name: eachChoice.name,
                explanation: eachChoice.explanation ? this.sanitizer.bypassSecurityTrustHtml(eachChoice.explanation) : null,
              });
              if (eachChoice.description) {
                info += '<p>' + eachChoice.name + ' - ' + eachChoice.description + '</p>';
              }
            });
            if (info) {
              // add the title
              info = '<h3>Choice Description:</h3>' + info;
            }
            question.info = info;
            question.choices = choices;
            break;

          case 'file':
            question.fileType = eachQuestion.fileType;
            break;

          case 'team member selector':
            question.teamMembers = [];
            eachQuestion.teamMembers.forEach(eachTeamMember => {
              question.teamMembers.push({
                key: JSON.stringify(eachTeamMember),
                userName: eachTeamMember.userName
              });
            });
            break;
        }
        questions.push(question);
      });
      if (!this.utils.isEmpty(questions)) {
        assessment.groups.push({
          name: eachGroup.name,
          description: eachGroup.description,
          questions: questions
        });
      }
    });
    return assessment;
  }

  private _normaliseSubmission(data): Submission {
    if (!this.utils.has(data, 'assessment.submissions') || data.assessment.submissions.length < 1) {
      return null;
    }
    const firstSubmission = data.assessment.submissions[0];
    let submission: Submission = {
      id: firstSubmission.id,
      status: this._submissionStatus(firstSubmission.status),
      submitterName: firstSubmission.submitter.name,
      submitterImage: firstSubmission.submitter.image,
      modified: firstSubmission.modified,
      isLocked: firstSubmission.locked,
      completed: firstSubmission.completed,
      reviewerName: firstSubmission.review ? this.checkReviewer(firstSubmission.review.reviewer) : null,
      answers: {}
    };
    firstSubmission.answers.forEach(eachAnswer => {
      eachAnswer.answer = this._normaliseAnswer(eachAnswer.questionId, eachAnswer.answer);
      submission.answers[eachAnswer.questionId] = {
        answer: eachAnswer.answer
      };
      if (['published', 'done'].includes(submission.status)) {
        submission = this._addChoiceExplanation(eachAnswer, submission);
      }
    });
    return submission;
  }

  private _submissionStatus(status: string) {
    switch (status) {
      case 'pending approval':
        return 'pending review';
      case 'published':
        return 'feedback available';
      default:
        return status;
    }
  }

  private _normaliseReview(data, action): AssessmentReview {
    if (!this.utils.has(data, 'assessment.submissions') || data.assessment.submissions.length < 1) {
      return null;
    }
    const firstSubmission = data.assessment.submissions[0];
    const firstSubmissionReview = firstSubmission.review;
    if (!firstSubmissionReview) {
      return null;
    }
    const review: AssessmentReview = {
      id: firstSubmissionReview.id,
      status: firstSubmissionReview.status,
      modified: firstSubmissionReview.modified,
      answers: {}
    };

    // only get the review answer if the review is published, or it is for the reviewer to see the review
    // i.e. don't display the review answer if it is for submitter and review not published yet
    if (firstSubmission.status !== 'published' && action === 'assessment') {
      return review;
    }

    firstSubmissionReview.answers.forEach(eachAnswer => {
      eachAnswer.answer = this._normaliseAnswer(eachAnswer.questionId, eachAnswer.answer);
      review.answers[eachAnswer.questionId] = {
        answer: eachAnswer.answer,
        comment: eachAnswer.comment
      };
    });
    return review;
  }

  /**
   * For each question that has choice (oneof & multiple), show the choice explanation in the submission if it is not empty
   */
  private _addChoiceExplanation(submissionAnswer, submission: Submission): Submission {
    const questionId = submissionAnswer.questionId;
    const answer = submissionAnswer.answer;
    // don't do anything if there's no choices
    if (this.utils.isEmpty(this.questions[questionId].choices)) {
      return submission;
    }
    let explanation = '';
    if (Array.isArray(answer)) {
      // multiple question
      this.questions[questionId].choices.forEach(choice => {
        // only display the explanation if it is not empty
        if (answer.includes(choice.id) && !this.utils.isEmpty(choice.explanation)) {
          explanation += choice.name + ' - ' + choice.explanation + '\n';
        }
      });
    } else {
      // oneof question
      this.questions[questionId].choices.forEach(choice => {
        // only display the explanation if it is not empty
        if (answer === choice.id && !this.utils.isEmpty(choice.explanation)) {
          explanation = choice.explanation;
        }
      });
    }
    if (!explanation) {
      return submission;
    }
    // put the explanation in the submission
    const thisExplanation = explanation.replace(/text-align: center;/gi, 'text-align: center; text-align: -webkit-center;');
    submission.answers[questionId].explanation = this.sanitizer.bypassSecurityTrustHtml(thisExplanation);

    return submission;
  }

  private _normaliseAnswer(questionId, answer) {
    if (this.questions[questionId]) {
      switch (this.questions[questionId].type) {
        case 'oneof':
          // re-format answer from string to number
          if (typeof answer === 'string' && answer.length === 0) {
            // Caution: let answer be null if question wasn't answered previously, 0 could be a possible answer ID
            answer = null;
          } else {
            answer = +answer;
          }
          break;
        case 'multiple':
          if (this.utils.isEmpty(answer)) {
            answer = [];
          }
          if (!Array.isArray(answer)) {
            // re-format json string to array
            answer = JSON.parse(answer);
          }
          // re-format answer from string to number
          answer = answer.map(value => {
            return +value;
          });
          break;
      }
    }
    return answer;
  }

  saveAnswers(assessment: AssessmentSubmitParams, answers: Answer[], action: string, hasPulseCheck: boolean) {
    if (!['assessment', 'review'].includes(action)) {
      return of(false);
    }
    if (environment.demo) {
      console.log('save answers', assessment, answers, action);
      this._afterSubmit(assessment, answers, action, hasPulseCheck);
      return this.demo.normalResponse();
    }
    let paramsFormat = `$assessmentId: Int!, $inProgress: Boolean, $answers: [${(action === 'assessment' ? 'AssessmentSubmissionAnswerInput' : 'AssessmentReviewAnswerInput')}]`;
    let params = 'assessmentId:$assessmentId, inProgress:$inProgress, answers:$answers';
    const variables = {
      assessmentId: assessment.id,
      inProgress: assessment.inProgress,
      answers: answers
    };
    [
      { key: 'submissionId', type: 'Int' },
      { key: 'contextId', type: 'Int!' },
      { key: 'reviewId', type: 'Int' },
      { key: 'unlock', type: 'Boolean' }
    ].forEach(item => {
      if (assessment[item.key]) {
        paramsFormat += `, $${item.key}: ${item.type}`;
        params += `,${item.key}: $${item.key}`;
        variables[item.key] = assessment[item.key];
      }
    });
    return this.apolloService.graphQLMutate(
      `mutation saveAnswers(${paramsFormat}){
        ` + (action === 'assessment' ? `submitAssessment` : `submitReview`) + `(${params})
      }`,
      variables
    ).pipe(map(res => {
      this._afterSubmit(assessment, answers, action, hasPulseCheck);
      return res;
    }));
  }

  private _afterSubmit(assessment: AssessmentSubmitParams, answers: Answer[], action: string, hasPulseCheck: boolean) {
    if (hasPulseCheck && !assessment.inProgress) {
      this._pullFastFeedback();
    }
  }

  /**
   * - check if fastfeedback is available
   * - show next sequence if submission successful
   */
   private async _pullFastFeedback() {
    try {
      const modal = await this.fastFeedbackService.pullFastFeedback({ modalOnly: true }).toPromise();
      if (modal && modal.present) {
        await modal.present();
        await modal.onDidDismiss();
      }
    } catch (err) {
      const toasted = await this.notificationService.alert({
        header: 'Error retrieving pulse check data',
        message: err.msg || JSON.stringify(err)
      });
      throw new Error(err);
    }
  }

  saveFeedbackReviewed(submissionId) {
    if (environment.demo) {
      console.log('feedback reviewed', submissionId);
      return of(true);
    }
    const postData = {
      project_id: this.storage.getUser().projectId,
      identifier: 'AssessmentSubmission-' + submissionId,
      is_done: true
    };
    return this.request.post(
      {
        endPoint: api.post.todoitem,
        data: postData
      });
  }

  /**
   * trigger reviewer rating modal
   *
   * @param   {number}          reviewId  submission review record id
   * @param   {string[]<void>}  redirect  array: routeUrl, boolean: disable
   *                                      routing (stay at same component)
   *
   * @return  {Promise<void>}             deferred ionic modal
   */
  popUpReviewRating(reviewId, redirect: string[] | boolean): Promise<void> {
    return this.notificationService.modal(ReviewRatingComponent, {
      reviewId,
      redirect
    });
  }

  checkReviewer(reviewer): string {
    if (!reviewer) {
      return null;
    }
    return reviewer.name !== this.storage.getUser().name ? reviewer.name : null;
  }

}
