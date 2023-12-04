/**CourseInfo: Contains information about a course.
•	id: Numeric ID of the course (451).
•	name: Name of the course ("Introduction to JavaScript").
*/
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
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
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
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
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

const isLate = (submittedAt, dueAt) => {
  const submittedDate = new Date(submittedAt);
  const dueDate = new Date(dueAt);

  try {
    if (isNaN(submittedDate.getTime()) || isNaN(dueDate.getTime())) {
    }
  } catch (error) {
    console.error("error: ", error.message);
  }
  return submittedDate > dueDate;
};

const calculateScore = (submission, assignment, latePenalty) => {
  const maxScore = assignment.points_possible;
  let score = submission.score;
  if (latePenalty) {
    score = Math.max(score - maxScore * 0.1, 0);
  }

  return score / maxScore;
};

const validateCourseAssignment = (course, assignmentsGrp) => {
  if (course.id !== assignmentsGrp.course_id) {
    throw new Error("Wrong Assignment group");
  }
  console.log("Validation passed");
};

function getLearnerData(course, assignmentsGrp, stdSubmission) {
  validateCourseAssignment(course, assignmentsGrp);

  const learners = stdSubmission.reduce((acc, submission) => {
    const assignment = assignmentsGrp.assignments.find(
      (element) => element.id === submission.assignment_id
    );
    if (assignment && new Date() >= new Date(assignment.due_at)) {
      const learnerId = submission.learner_id;
      if (!acc[learnerId]) {
        acc[learnerId] = { id: learnerId, finalScore: 0, totalWeight: 0 };
      }

      const late = isLate(
        submission.submission.submitted_at,
        assignment.due_at
      );
      const adjustedScore = calculateScore(submission.submission, assignment, late) * assignmentsGrp.group_weight;
      console.log(
        `The Learner with ID: ${learnerId}, ` +
        `Assignment ID: ${assignment.id}, ` +
        `Was Submitted At: ${submission.submission.submitted_at},\r ` +
        `The Due At is: ${assignment.due_at},` +
        `The Late is: ${late},` +
        `Penalty Applied: ${late ? '\vYes' : '\fNo'}`
      );
      
      acc[learnerId].finalScore += adjustedScore;
      acc[learnerId].totalWeight += assignmentsGrp.group_weight;
    }
    return acc;
  }, {});

// Calculate final average and format result
return Object.values(learners).forEach(learner => {
    const averageScore = learner.totalWeight > 0 ? learner.finalScore / learner.totalWeight : 0;
    console.log("Learner ID: ", learner.id, "Average Score: ", averageScore.toFixed(2));

});
}
getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

try {
  validateCourseAssignment(CourseInfo, AssignmentGroup);
} catch (error) {
  console.error(error.message);
}
