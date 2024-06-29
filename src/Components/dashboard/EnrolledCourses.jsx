import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);
const navigate= useNavigate()
  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
      console.log(response)
    } catch (error) {
      console.log(error.message);
      console.log("Unable to Fetch Enrolled Course");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full">
        <div>Enrolled Courses</div>

        {/* Data leke aao  */}
        {!enrolledCourses ? (
          <div>Loading...</div>
        ) : !enrolledCourses.length ? (
          <p>You Have not enrolled in any course yet</p>
        ) : (
          <div className="my-8 text-richblack-5 w-full">
            {/* Headings */}
            <div className="flex rounded-t-lg bg-richblack-500 w-full">
              <p className="w-[45%] px-5 py-3">Course Name</p>
              <p className="w-1/4 px-2 py-3">Duration</p>
              <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {/* Course Names */}
            {enrolledCourses.map((course, i, arr) => (
            
              <div
                className={`flex items-center border border-richblack-700  ${
                  i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                }`}
                key={i}
              >
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>
                <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
    </div>
  );
};

export default EnrolledCourses;
