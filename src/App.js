import Data from "./data/data.json";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { RiUser3Line } from "react-icons/ri";

export default function App() {
  const [finalStudents, setFinalStudents] = useState([]);
  const [topThree, setTopThree] = useState(3);
  const [heading, setHeading] = useState("Top 3 Students");
  const [details, setDetails] = useState(false);
  const [position, setPosition] = useState(1);

  useEffect(() => {
    handleCalculations();
  }, []);

  const handleCalculations = () => {
    if (Array.isArray(Data)) {
      let array = [];
      array = Data;
      const finalStuds = [];
      array.forEach((student) => {
        var totalMarksOfAStudent = 0;
        console.log("student.marks", student.marks);
        let studMarks = [];
        studMarks = student.marks;
        studMarks.forEach((mark) => {
          var subjectMarks = mark.marks;
          // console.log("sub marks", mark);
          if (subjectMarks > 16.5) {
            // console.log("Subject marks", subjectMarks);
            totalMarksOfAStudent = totalMarksOfAStudent + subjectMarks;
            // console.log("totalMarksOfAStudent", totalMarksOfAStudent);
          }
        });
        var object = {
          id: Math.random() * 10,
          name: student.name,
          subjectMarks: student.marks,
          totalMarks: totalMarksOfAStudent
        };
        finalStuds.push(object);
        finalStuds.sort((a, b) =>
          a.name < b.totalMarks ? 1 : b.totalMarks < a.totalMarks ? -1 : 0
        );
        // console.log("sortable", finalStuds);
      });
      setFinalStudents(finalStuds);
    }
  };

  const showAllStudents = () => {
    // console.log("It is wokring", finalStudents);
    setTopThree(finalStudents.length);
    setHeading("All students By  ranking");
  };

  const showAllSUbjectsMarks = () => {
    // finalStudents.map((item) => {
    //   console.log(item.subjectMarks)
    // })

    setDetails(!details);
  };
  return (
    <div className="App">
      <h1>{heading}</h1>

      {/* {details && <PopUp finalStudents={finalStudents} />} */}
      {finalStudents.slice(0, topThree).map((items, index) => {
        const { first, last } = items.name;
        const { id } = items;
        // console.log("final student marks", finalStudents);

        return (
          <div key={id}>
            <br />
            <div className="students">
              <div className="card">
                <RiUser3Line fontSize={50} />
                <h4>
                  {first} {last}
                </h4>
                <span className="Position">Position: {index + 1}</span>
                <div className="Marks">
                  <h2> Marks</h2>

                  <p>
                    {items.subjectMarks.map((marks) => {
                      return (
                        <div>
                          {details && (
                            <div>
                              {" "}
                              <p>
                                {marks.subject}:{" "}
                                {marks.marks < 16.5 ? (
                                  <p className="Fail">Fail : {marks.marks}</p>
                                ) : (
                                  marks.marks
                                )}
                              </p>
                            </div>
                          )}{" "}
                        </div>
                      );
                    })}
                  </p>
                </div>
                <p className="totalMarks">Total marks :{items.totalMarks}</p>
              </div>
            </div>
          </div>
        );
      })}
      <button onClick={showAllSUbjectsMarks} className="details">
        Click here for details
      </button>
      <button onClick={showAllStudents} className="showAll">
        Show All Rank
      </button>
    </div>
  );
}
