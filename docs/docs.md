# AppV3

## Assessment Module
This explain how the app should interact with our user

### AssessmentService

#### API response format validation
- Upon API responds, app validates API response format with `data.[API-NAME].success=true`
- if it's not `data.[API-NAME].success=true`, app treats the format as bad API format (throw error)
- this applies to:
  - saveSubmissionAnswer
  - saveReviewAnswer
  - submitAssessment
  - submitReview

#### User action logic
Error handling done for better UX, toast message (in an assessment screen) appearance conditions

1. internet connect is back (green)
1. successful submission (green)
1. failed submission (red)
1. failed autosave (red)
1. inconsistent API format, but success (red)
1. internet gone offline (native window.alert(), no toast popup)

## Practera Appv2 Documentation (Obsoleted)
This is practera documentation with more informations.

### Services
- [Chat Service](./services/chatService.md)

### Components
- [Chat Room Component](./components/chatRoomComponent.md)
- [Chat List Component](./components/chatListComponent.md)