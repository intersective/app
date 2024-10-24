import { flush, flushMicrotasks, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequestService } from 'request';
import { BrowserStorageService } from '@v3/services/storage.service';
import { UtilsService } from '@v3/services/utils.service';
import { NotificationsService } from '@v3/services/notifications.service';
import { AssessmentService } from './assessment.service';
import { TestUtils } from '@testingv3/utils';
import { ApolloService } from './apollo.service';

describe('AssessmentService', () => {
  let service: AssessmentService;
  let requestSpy: jasmine.SpyObj<RequestService>;
  let apolloSpy: jasmine.SpyObj<ApolloService>;
  let notificationSpy: jasmine.SpyObj<NotificationsService>;
  let utils: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AssessmentService,
        {
          provide: UtilsService,
          useClass: TestUtils,
        },
        {
          provide: ApolloService,
          useValue: jasmine.createSpyObj('ApolloService', [
            'graphQLWatch', 'graphQLMutate'
          ])
        },
        {
          provide: NotificationsService,
          useValue: jasmine.createSpyObj('NotificationsService', ['modal'])
        },
        {
          provide: RequestService,
          useValue: jasmine.createSpyObj('RequestService', [
            'get', 'post', 'apiResponseFormatError'
          ]),
        },
        {
          provide: BrowserStorageService,
          useValue: jasmine.createSpyObj('BrowserStorageService', {
            getUser: {
              name: 'Test',
              projectId: 1
            }
          })
        },
        {
          provide: ApolloService,
          useValue: jasmine.createSpyObj('ApolloService', ['graphQLMutate', 'graphQLWatch'])
        },
      ]
    });
    service = TestBed.inject(AssessmentService);
    requestSpy = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    apolloSpy = TestBed.inject(ApolloService) as jasmine.SpyObj<ApolloService>;
    notificationSpy = TestBed.inject(NotificationsService) as jasmine.SpyObj<NotificationsService>;
    utils = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when testing getAssessment()', () => {
    let requestResponse;
    let expectedAssessment, expectedSubmission, expectedReview;
    let assessment, group0, question0, question1, question2, group1, question3, question4, submission, review;
    beforeEach(() => {
      requestResponse = {
        data: {
          assessment: {
            id: 1,
            name: 'test',
            type: 'quiz',
            description: 'des',
            isTeam: false,
            dueDate: '2019-02-02',
            pulseCheck: false,
            groups: [
              {
                name: 'g name',
                description: 'g des',
                questions: [
                  {
                    id: 1,
                    name: 'test name 1',
                    description: 'des 1',
                    type: 'text',
                    isRequired: true,
                    hasComment: true,
                    audience: ['submitter']
                  },
                  {
                    id: 2,
                    name: 'test name 2',
                    description: 'des 2',
                    type: 'oneof',
                    isRequired: true,
                    hasComment: true,
                    audience: ['reviewer'],
                    choices: [
                      {
                        id: 21,
                        name: 'choice name 1'
                      },
                      {
                        id: 22,
                        name: 'choice name 2'
                      }
                    ]
                  },
                  {
                    id: 3,
                    name: 'test name 3',
                    description: 'des 3',
                    type: 'multiple',
                    isRequired: true,
                    hasComment: true,
                    audience: ['submitter', 'reviewer'],
                    choices: [
                      {
                        id: 31,
                        name: 'choice name 1',
                        description: 'choice des 1'
                      },
                      {
                        id: 32,
                        name: 'choice name 2',
                        description: 'choice des 2'
                      }
                    ]
                  }
                ]
              },
              {
                name: 'g name',
                description: 'g des',
                questions: [
                  {
                    id: 11,
                    name: 'test name 11',
                    description: 'des 11',
                    type: 'file',
                    isRequired: true,
                    hasComment: true,
                    audience: ['submitter', 'reviewer'],
                    fileType: 'any'
                  },
                  {
                    id: 12,
                    name: 'test name 12',
                    description: 'des 12',
                    type: 'team member selector',
                    isRequired: true,
                    hasComment: true,
                    audience: ['submitter', 'reviewer'],
                    teamMembers: [
                      {
                        id: 121,
                        userName: 'member name 1'
                      },
                      {
                        id: 122,
                        userName: 'member name 2'
                      }
                    ]
                  },
                ]
              }
            ],
            submissions: [
              {
                id: 1,
                status: 'feedback available',
                modified: '2019-02-02',
                locked: false,
                completed: false,
                submitter: {
                  name: 'test name',
                  image: '',
                  team: {
                    name: 'team-test',
                  }
                },
                answers: [
                  {
                    questionId: 1,
                    answer: 'abc'
                  },
                  {
                    questionId: 2,
                    answer: 21
                  },
                  {
                    questionId: 3,
                    answer: [31]
                  },
                  {
                    questionId: 11,
                    answer: ''
                  },
                  {
                    questionId: 12,
                    answer: '{"id": 121,"userName": "member name 1"}'
                  }
                ],
                review: {
                  id: 2,
                  status: 'done',
                  modified: '2019-02-02',
                  reviewer: {
                    name: 'test reviewer name'
                  },
                  answers: [
                    {
                      questionId: 1,
                      answer: 'abc',
                      comment: null
                    },
                    {
                      questionId: 2,
                      answer: 21,
                      comment: 'def'
                    },
                    {
                      questionId: 3,
                      answer: [31],
                      comment: 'def'
                    },
                    {
                      questionId: 11,
                      answer: '',
                      comment: 'def'
                    },
                    {
                      questionId: 12,
                      answer: null,
                      comment: null
                    }
                  ]
                }
              }
            ]
          }
        }
      };
      assessment = requestResponse.data.assessment;
      group0 = assessment.groups[0];
      // text
      question0 = group0.questions[0];
      // oneof
      question1 = group0.questions[1];
      // multiple
      question2 = group0.questions[2];
      group1 = assessment.groups[1];
      // file
      question3 = group1.questions[0];
      // team member selector
      question4 = group1.questions[1];
      expectedAssessment = {
        id: 1,
        name: assessment.name,
        type: assessment.type,
        description: assessment.description,
        isForTeam: assessment.isTeam,
        dueDate: assessment.dueDate,
        isOverdue: assessment.dueDate ? utils.timeComparer(assessment.dueDate) < 0 : false,
        pulseCheck: assessment.pulseCheck,
        groups: [
          {
            name: group0.name,
            description: group0.description,
            questions: [
              {
                id: question0.id,
                name: question0.name,
                type: question0.type,
                description: question0.description,
                isRequired: question0.isRequired,
                canComment: question0.hasComment,
                canAnswer: question0.audience.includes('submitter'),
                audience: question0.audience,
                submitterOnly: true,
                reviewerOnly: false
              },
              {
                id: question1.id,
                name: question1.name,
                type: question1.type,
                description: question1.description,
                isRequired: question1.isRequired,
                canComment: question1.hasComment,
                canAnswer: question1.audience.includes('submitter'),
                audience: question1.audience,
                submitterOnly: false,
                reviewerOnly: true,
                info: '',
                choices: [
                  {
                    id: question1.choices[0].id,
                    name: question1.choices[0].name,
                    explanation: null
                  },
                  {
                    id: question1.choices[1].id,
                    name: question1.choices[1].name,
                    explanation: null
                  }
                ]
              },
              {
                id: question2.id,
                name: question2.name,
                type: question2.type,
                description: question2.description,
                isRequired: question2.isRequired,
                canComment: question2.hasComment,
                canAnswer: question2.audience.includes('submitter'),
                audience: question2.audience,
                submitterOnly: false,
                reviewerOnly: false,
                info: `<h3>Choice Description:</h3><p>${question2.choices[0].name} ` +
                  `- ${question2.choices[0].description}</p><p>${question2.choices[1].name} ` +
                  `- ${question2.choices[1].description}</p>`,
                choices: [
                  {
                    id: question2.choices[0].id,
                    name: question2.choices[0].name,
                    explanation: null
                  },
                  {
                    id: question2.choices[1].id,
                    name: question2.choices[1].name,
                    explanation: null
                  }
                ]
              }
            ]
          },
          {
            name: group1.name,
            description: group1.description,
            questions: [
              {
                id: question3.id,
                name: question3.name,
                type: question3.type,
                description: question3.description,
                isRequired: question3.isRequired,
                canComment: question3.hasComment,
                canAnswer: question3.audience.includes('submitter'),
                audience: question3.audience,
                submitterOnly: false,
                reviewerOnly: false,
                fileType: question3.fileType
              },
              {
                id: question4.id,
                name: question4.name,
                type: question4.type,
                description: question4.description,
                isRequired: question4.isRequired,
                canComment: question4.hasComment,
                canAnswer: question4.audience.includes('submitter'),
                audience: question4.audience,
                submitterOnly: false,
                reviewerOnly: false,
                teamMembers: [
                  {
                    key: JSON.stringify(question4.teamMembers[0]),
                    userName: question4.teamMembers[0].userName
                  },
                  {
                    key: JSON.stringify(question4.teamMembers[1]),
                    userName: question4.teamMembers[1].userName
                  }
                ]
              }
            ]
          }
        ]
      };
      submission = assessment.submissions[0];
      expectedSubmission = {
        id: submission.id,
        status: submission.status,
        submitterName: submission.submitter.name,
        submitterImage: submission.submitter.image,
        modified: submission.modified,
        isLocked: submission.locked,
        completed: submission.completed,
        reviewerName: submission.review.reviewer.name,
        answers: {
          1: {
            answer: submission.answers[0].answer
          },
          2: {
            answer: submission.answers[1].answer
          },
          3: {
            answer: submission.answers[2].answer
          },
          11: {
            answer: submission.answers[3].answer
          },
          12: {
            answer: submission.answers[4].answer
          }
        }
      };
      review = submission.review;
      expectedReview = {
        id: review.id,
        status: review.status,
        modified: review.modified,
        teamName: submission.submitter.team.name,
        answers: {
          1: {
            answer: review.answers[0].answer,
            comment: review.answers[0].comment
          },
          2: {
            answer: review.answers[1].answer,
            comment: review.answers[1].comment
          },
          3: {
            answer: review.answers[2].answer,
            comment: review.answers[2].comment
          },
          11: {
            answer: review.answers[3].answer,
            comment: review.answers[3].comment
          },
          12: {
            answer: review.answers[4].answer,
            comment: review.answers[4].comment
          }
        }
      };
    });

    afterEach(() => {
      apolloSpy.graphQLWatch.and.returnValue(of(requestResponse));
      service.getAssessment(1, 'assessment', 2, 3);
      service.assessment$.subscribe(assessment => {
        expect(assessment).toEqual(expectedAssessment);
      });
      service.submission$.subscribe(submission => {
        expect(submission).toEqual(expectedSubmission);
      });
      service.review$.subscribe(review => {
        expect(review).toEqual(expectedReview);
      });
      expect(apolloSpy.graphQLWatch.calls.count()).toBe(1);
    });

    it(`should not include a question group if there's no question inside`, () => {
      // if a question group doesn't have question
      requestResponse.data.assessment.groups[1].questions = [];
      requestResponse.data.assessment.submissions[0].answers.splice(3, 2);
      requestResponse.data.assessment.submissions[0].review.answers.splice(3, 2);
      // the expected result won't contain that group
      expectedAssessment.groups.splice(1, 1);
      delete expectedSubmission.answers[11];
      delete expectedSubmission.answers[12];
      delete expectedReview.answers[1];
      delete expectedReview.answers[2];
      delete expectedReview.answers[3];
      delete expectedReview.answers[11];
      delete expectedReview.answers[12];
    });

    it('should get correct submission data without review', () => {
      requestResponse.data.assessment.submissions[0].review = null;
      expectedSubmission.reviewerName = null;
      expectedReview = null;
    });
  });

  describe('when testing saveAnswers()', () => {
    const answers = [
      { questionId: 123, answer: 'abc' },
      { questionId: 124, answer: 456 },
      { questionId: 125, answer: [3, 4] },
      { questionId: 126, answer: [3] },
      { questionId: 127, answer: { filename: 'abc.png' } }
    ];
    beforeEach(() => {
      apolloSpy.graphQLMutate.and.returnValue(of(true));
    });

    it('should save assessment answers correctly', () => {
      const assessment = {
        id: 1,
        inProgress: true,
        contextId: 2
      };
      service.saveAnswers(assessment, answers, 'assessment', false).subscribe();
      expect(apolloSpy.graphQLMutate.calls.first().args[0]).toContain('submitAssessment');
      expect(apolloSpy.graphQLMutate.calls.first().args[1]).toEqual({
        assessmentId: assessment.id,
        inProgress: assessment.inProgress,
        contextId: assessment.contextId,
        answers: answers
      });
    });

    it('should save assessment answers correctly with submission id', () => {
      const assessment = {
        id: 1,
        inProgress: true,
        contextId: 2,
        submissionId: 3,
        unlock: true
      };
      service.saveAnswers(assessment, answers, 'assessment', false).subscribe();
      expect(apolloSpy.graphQLMutate.calls.first().args[0]).toContain('submitAssessment');
      expect(apolloSpy.graphQLMutate.calls.first().args[1]).toEqual({
        assessmentId: assessment.id,
        inProgress: assessment.inProgress,
        contextId: assessment.contextId,
        submissionId: assessment.submissionId,
        unlock: assessment.unlock,
        answers: answers
      });
    });

    it('should save review answers correctly', () => {
      const assessment = {
        id: 1,
        inProgress: true,
        submissionId: 3,
        reviewId: 4
      };
      service.saveAnswers(assessment, answers, 'review', false).subscribe();
      expect(apolloSpy.graphQLMutate.calls.first().args[0]).toContain('submitReview');
      expect(apolloSpy.graphQLMutate.calls.first().args[1]).toEqual({
        assessmentId: assessment.id,
        inProgress: assessment.inProgress,
        submissionId: assessment.submissionId,
        reviewId: assessment.reviewId,
        answers: answers
      });
    });

    it('should return success false if action not correct', () => {
      const assessment = {
        id: 1,
        inProgress: true
      };
      service.saveAnswers(assessment, answers, 'incorrect', false).subscribe(res => expect(res).toBe(false));
      expect(apolloSpy.graphQLMutate.calls.count()).toBe(0);
    });
  });

  describe('when testing saveFeedbackReviewed()', () => {
    it('should post correct data', () => {
      service.saveFeedbackReviewed(11);
      expect(requestSpy.post.calls.count()).toBe(1);
      expect(requestSpy.post.calls.first().args[0].data).toEqual({
        project_id: 1,
        identifier: 'AssessmentSubmission-11',
        is_done: true
      });
    });
  });

  describe('when testing checkReviewer()', () => {
    it('should return null if no reviewer passed in', () => {
      expect(service.checkReviewer(null)).toEqual(null);
    });
    it('should return null if reviewer is the current person', () => {
      expect(service.checkReviewer({ name: 'Test' })).toEqual(null);
    });
  });

  describe('_normaliseAnswer', () => {
    beforeEach(() => {
      service.questions = {
        1: { type: 'oneof', choices: [] },
        2: { type: 'multiple', choices: [] },
        3: { type: 'multi team member selector', choices: [] }
      };
    });

    it('should convert string to number for oneof question type', () => {
      const result = service['_normaliseAnswer'](1, '123');
      expect(result).toEqual(123);
    });

    it('should convert empty string to null for oneof question type', () => {
      const result = service['_normaliseAnswer'](1, '');
      expect(result).toBeNull();
    });

    it('should convert string to array for multiple question type', () => {
      const result = service['_normaliseAnswer'](2, '[1,2,3]');
      expect(result).toEqual([1, 2, 3]);
    });

    it('should handle non-array string by wrapping it in an array for multiple question type', () => {
      const result = service['_normaliseAnswer'](2, 'not an array');
      expect(result).toEqual(['not an array']);
    });

    it('should parse string to array for multi team member selector question type', () => {
      const result = service['_normaliseAnswer'](3, '[1,2,3]');
      expect(result).toEqual([1, 2, 3]);
    });

    it('should return the answer as is for invalid question type', () => {
      const result = service['_normaliseAnswer'](999, 'test');
      expect(result).toEqual('test');
    });

    it('should return the answer as is if question not found', () => {
      const result = service['_normaliseAnswer'](4, 'test'); // Assuming questionId 4 does not exist
      expect(result).toEqual('test');
    });
  });
});
