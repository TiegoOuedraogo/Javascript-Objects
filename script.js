/**CourseInfo: Contains information about a course.
•	id: Numeric ID of the course (451).
•	name: Name of the course ("Introduction to JavaScript").
*/
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  /**•	id: Numeric ID of the assignment group (12345).
•	name: Name of the assignment group ("Fundamentals of JavaScript").
•	course_id: ID of the associated course (451).
•	group_weight: Weight of the assignment group as a percentage (25%).
•	assignments: Array of assignments, each with an ID, name, due date, and points possible.
*/
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  /**LearnerSubmissions: Array of objects representing submissions by learners.
   * Each object includes the learner ID, assignment ID, 
   * and submission details (submission date and score).
*/
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];

  const isLate=(submittedAt, dueAt)=>{
    const submittedDate = new Date(submittedAt);
    const dueDate = new Date(dueAt);

    try {
        if(isNaN(submittedDate.getTime()) || isNaN(dueDate.getTime)){
        }
    } catch (error) {
        console.error("error: ", error.message);
    }
    return submittedDate > dueDate

  }

const calculateScore=(submission,assignment,latePenalty)=>{
    const maxScore = assignment.points_possible;
    let score = submission.score;
    if(latePenalty){
        score = Math.max(score -maxScore* 0.1,0)
    }

    return score/maxScore
  }
  
  const learnerEachSubmission = (learnerId) => {
    LearnerSubmissions.forEach(submission => {
      if (submission.learner_id === learnerId) {
        /** find method returns the value of the first element in the array where predicate is true, and undefined otherwise.
         * find calls predicate once for each element of the array, in ascending order, 
         * until it finds one where predicate returns true. If such an element is found, 
         * find immediately returns that element value. Otherwise, find returns undefined. */
        const assignment = AssignmentGroup.assignments.find(assignment => assignment.id === submission.assignment_id);

        if (assignment) {
          const late = isLate(submission.submission.submitted_at,assignment.due_at);
          console.log(`Assignment: ${assignment.name}, Submitted At: ${submission.submission.submitted_at}, Due At: ${assignment.due_at}, Late: ${late}`);
        }
      }

    
    });
  };
  LearnerSubmissions.forEach(submission => {
    const assignment = AssignmentGroup.assignments.find(a => a.id === submission.assignment_id);
  
    if (assignment) {
      const late = isLate(submission.submission.submitted_at, assignment.due_at);
      const finalScore = calculateScore(submission.submission, assignment, late);
        console.log(`Learner ID: ${submission.learner_id}, Assignment: ${assignment.name}, Final Score is: ${finalScore}`);
    }
  });
//   learnerEachSubmission(125);
//   learnerEachSubmission(132);

