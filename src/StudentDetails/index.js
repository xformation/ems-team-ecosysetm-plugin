import * as React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { studentDetailsSettingsServices } from '../_services/studentDetailsSettings.services';
import '../_static/css/custom.css';
import withLoadingHandler from '../_helpers/loading.handler';
import { GET_STUDENT_DETAILS_DATA, STUDENT_DETAILS } from '../_queries/StudentDetails';


class StudentsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentData: {
                college: {
                    id: 1801
                },
                academicYear: {
                    id: 1701
                },
                branch: {
                    id: ""
                },
                department: {
                    id: ""
                },
                batch: {
                    id: ""
                },
                section: {
                    id: ""
                },
                studentType: {
                    id: ""
                },
                gender: {
                    id: ""
                },
                mutateResult: [],
                search: ""
            },
            branches: [],
            departments: [],
            batches: [],
            sections: [],
            studentTypes: [],
            genders: [],
            search: ''
        }
        this.createBranches = this.createBranches.bind(this);
        this.createDepartments = this.createDepartments.bind(this);
        this.createBatches = this.createBatches.bind(this);
        this.createSections = this.createSections.bind(this);
        this.createStudentTypes = this.createStudentTypes.bind(this);
        this.createGenders = this.createGenders.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.checkAllStudents = this.checkAllStudents.bind(this);
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
        this.createStudentRows = this.createStudentRows.bind(this);
    }

    checkAllStudents(e) {
        const { studentData } = this.state;
        const mutateResLength = studentData.mutateResult.length;
        let chkAll = e.nativeEvent.target.checked;
        let els = document.querySelectorAll("input[type=checkbox]");
    
        var empty = [].filter.call(els, function (el) {
          if (chkAll) {
            el.checked = true;
          } else {
            el.checked = false;
          }
        });
    }
    
    onClickCheckbox(index, e) {
        const { id } = e.nativeEvent.target;
        let chkBox = document.querySelector("#" + id);
        chkBox.checked = e.nativeEvent.target.checked;
    }

    createStudentRows(objAry) {
        let { search } = this.state.studentData;
        search = search.trim();
        const mutateResLength = objAry.length;
        const retVal = [];
        for (let x = 0; x < mutateResLength; x++) {
          const tempObj = objAry[x];
          const students = tempObj.data.getStudentList;
          const length = students.length;
          for (let i = 0; i < length; i++) {
            const student = students[i];
            if(search){
              if(student.studentName.indexOf(search) !== -1){
                retVal.push(
                  <tr key={student.id}>
                    <td>
                      <input onClick={(e) => this.onClickCheckbox(i, e)} checked={student.isChecked} type="checkbox" name="" id={"chk" + student.id} />
                    </td>
                    <td>
                        <Link className="table-link link-color" to={`/plugins/ems-student/page/student?id=${student.id}`}>
                            {student.studentName}
                        </Link>
                    </td>
                    <td>{student.rollNo}</td>
                    <td>{student.id}</td>
                    <td>{student.department.name}</td>
                    <td>{student.batch.batch}</td>
                    <td>{student.section.section}</td>
                    <td>{student.sex}</td>
                    <td>{student.studentType}</td>
                    <td>{student.emergencyContactNo}</td>
                  </tr>
                );
              }
            } else{
              retVal.push(
                <tr key={student.id}>
                  <td>
                    <input onClick={(e) => this.onClickCheckbox(i, e)} checked={student.isChecked} type="checkbox" name="" id={"chk" + student.id} />
                  </td>
                  <td>
                    <Link className="table-link link-color" to={`/plugins/ems-student/page/student?id=${student.id}`}>
                        {student.studentName}
                    </Link>
                  </td>
                  <td>{student.rollNo}</td>
                  <td>{student.id}</td>
                  <td>{student.department.name}</td>
                  <td>{student.batch.batch}</td>
                  <td>{student.section.section}</td>
                  <td>{student.sex}</td>
                  <td>{student.studentType}</td>
                  <td>{student.emergencyContactNo}</td>
                </tr>
              );
            }
          }
        }
        return retVal;
    }


    onChange = (e) => {
        const { search } = e.nativeEvent.target;
        const { name, value } = e.nativeEvent.target;
        const { studentData } = this.state;
        if (name === "branch") {
            this.setState({
                studentData: {
                    ...studentData,
                    branch: {
                        id: value
                    },
                    department: {
                        id: ""
                    },
                    batch: {
                        id: ""
                    },
                    section: {
                        id: ""
                    },
                    gender: {
                        id: ""
                    },
                    studentType: {
                        id: ""
                    }
                }
            });
        } else if (name === "department") {
            this.setState({
                studentData: {
                    ...studentData,
                    department: {
                        id: value
                    },
                    batch: {
                        id: ""
                    },
                    section: {
                        id: ""
                    },
                    gender: {
                        id: ""
                    },
                    studentType: {
                        id: ""
                    }
                }
            });
        } else if (name === "batch") {
            this.setState({
                studentData: {
                    ...studentData,
                    batch: {
                        id: value
                    },
                    section: {
                        id: ""
                    },
                    gender: {
                        id: ""
                    },
                    studentType: {
                        id: ""
                    }
                }
            });
        }
        else if (name === "section") {
            this.setState({
                studentData: {
                    ...studentData,
                    section: {
                        id: value
                    },
                    gender: {
                        id: ""
                    },
                    studentType: {
                        id: ""
                    }
                }
            });
        }
        else if (name === "gender") {
            this.setState({
                studentData: {
                    ...studentData,
                    gender: {
                        id: value
                    },
                    studentType: {
                        id: ""
                    }
                }
            });
        }
        else if (name === "studentType") {
            this.setState({
                studentData: {
                    ...studentData,
                    studentType: {
                        id: value
                    }
                }
            });
        } else {
            this.setState({
                studentData: {
                    ...studentData,
                    [name]: value
                }
            });
        }
    }

    createBranches(branches) {
        let branchesOptions = [<option key={0} value="">Select Branch</option>];
        for (let i = 0; i < branches.length; i++) {
            branchesOptions.push(
                <option key={branches[i].id} value={branches[i].id}>{branches[i].branchName}</option>
            );
        }
        return branchesOptions;
    }

    createDepartments(departments, selectedBranchId, selectedAcademicYearId) {
        let departmentsOptions = [<option key={0} value="">Select department</option>];
        for (let i = 0; i < departments.length; i++) {
            if (selectedBranchId == departments[i].branch.id && selectedAcademicYearId == departments[i].academicyear.id) {
                departmentsOptions.push(
                    <option key={departments[i].id} value={departments[i].id}>{departments[i].name}</option>
                );
            }
        }
        return departmentsOptions;
    }

    createBatches(batches, selectedDepartmentId) {
        let batchesOptions = [<option key={0} value="">Select Year</option>];
        for (let i = 0; i < batches.length; i++) {
            let id = batches[i].id;
            let dptId = "" + batches[i].department.id;
            if (dptId == selectedDepartmentId) {
                batchesOptions.push(
                    <option key={id} value={id}>{batches[i].batch}</option>
                );
            }
        }
        return batchesOptions;
    }

    createSections(sections, selectedBatchId) {
        let sectionsOptions = [<option key={0} value="">Select Section</option>];
        for (let i = 0; i < sections.length; i++) {
            let id = sections[i].id;
            let sbthId = "" + sections[i].batch.id;
            if (sbthId == selectedBatchId) {
                sectionsOptions.push(
                    <option key={id} value={id}>{sections[i].section}</option>
                );
            }
        }
        return sectionsOptions;
    }

    createStudentTypes(studentTypes) {
        let studentTypesOptions = [<option key={0} value="">Select Student Type</option>];
        for (let i = 0; i < studentTypes.length; i++) {
            let id = studentTypes[i].id;
            studentTypesOptions.push(
                <option key={id} value={studentTypes[i].description}>{studentTypes[i].description}</option>
            );
        }
        return studentTypesOptions;
    }

    createGenders(genders) {
        let gendersOptions = [<option key={0} value="">Select Gender</option>];
        for (let i = 0; i < genders.length; i++) {
            let id = genders[i].id;
            gendersOptions.push(
                <option key={id} value={genders[i].description}>{genders[i].description}</option>
            );
        }
        return gendersOptions;
    }

    onClick = (e) => {
        const { name, value } = e.nativeEvent.target;
        const { mutate } = this.props;
        const { studentData } = this.state;
        e.preventDefault();

        let studentFilterInputObject = {
            branchId: studentData.branch.id,
            departmentId: studentData.department.id,
            batchId: studentData.batch.id,
            sectionId: studentData.section.id,
            gender: studentData.gender.id,
            studentType: studentData.studentType.id
        };


        return mutate({
            variables: { filter: studentFilterInputObject },
        }).then(data => {
            const sdt = data;
            studentData.mutateResult = [];
            studentData.mutateResult.push(sdt);
            this.setState({
                studentData: studentData
            });
        }).catch((error) => {
            return Promise.reject(`Could not retrieve student data: ${error}`);
        });

    }

    render() {
        const { branches, departments, batches, sections, genders, studentTypes } = this.props.data.createStudentFilterDataCache || {};
        const { studentData } = this.state;
        return (
            <section className="xform-container">
                <div className="row">
                    <div className="col-12 profile-header">
                        <h3 className="bg-heading p-1 mb-0">
                            <i className="fa fa-university mr-1"></i>
                            Admin - Student Management
                        </h3>
                    </div>
                </div>
                <div className="student-profile-container">
                    <div className="row">
                        <div className="col-12 mb-2 profile-header">
                            <div className="d-inline-block float-left heading">Student Details</div>
                            <div className="d-inline-block float-right">
                                <button className="btn btn-primary" type="submit">Create New Student</button>
                                <button className="btn btn-primary ml-1" type="submit">Export</button>
                                <select name="fileType" id="fileType" className="max-width-25 ml-1">
                                    <option value="">Select File Type</option>
                                    <option value="CSV">CSV</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row student-flex">
                                <div className="w-auto px-0">
                                    <label htmlFor="">Branch</label>
                                    <select name="branch" id="branch" onChange={this.onChange} value={studentData.branch.id} className="form-control">
                                        {this.createBranches(branches)}
                                    </select>
                                </div>
                                <div className="w-auto px-0">
                                    <label htmlFor="">Department</label>
                                    <select name="department" id="department" onChange={this.onChange} value={studentData.department.id} className="form-control">
                                        {this.createDepartments(departments, studentData.branch.id, studentData.academicYear.id)}
                                    </select>
                                </div>
                                <div className="w-auto px-0">
                                    <label htmlFor="">Year</label>
                                    <select name="batch" id="batch" onChange={this.onChange} value={studentData.batch.id} className="form-control">
                                        {this.createBatches(batches, studentData.department.id)}
                                    </select>
                                </div>
                                <div className="w-auto px-0">
                                    <label htmlFor="">Section</label>
                                    <select name="section" id="section" onChange={this.onChange} value={studentData.section.id} className="form-control">
                                        {this.createSections(sections, studentData.batch.id)}
                                    </select>
                                </div>
                                <div className="w-auto px-0">
                                    <label htmlFor="">Gender</label>
                                    <select name="gender" id="gender" onChange={this.onChange} value={studentData.gender.id} className="form-control">
                                        {this.createGenders(genders)}
                                    </select>
                                </div>
                                <div className="w-auto px-0">
                                    <label htmlFor="">Student Type</label>
                                    <select name="studentType" id="studentType" onChange={this.onChange} value={studentData.studentType.id} className="form-control">
                                        {this.createStudentTypes(studentTypes)}
                                    </select>
                                </div>
                                <div className="w-auto px-0">
                                    <label htmlFor="">Search</label>
                                    <input type="text" name="search" className="form-control" value={studentData.search} onChange={this.onChange} />
                                </div>
                                <div className="w-auto px-0">
                                    <label htmlFor=""></label>
                                    <button className="btn btn-primary" id="btnFind" name="btnFind" onClick={this.onClick}>Search Students</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 p-0">
                            <table id="studentlistpage" className="striped-table w-100 bg-white">
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" onClick={(e) => this.checkAllStudents(e)} value="checkedall" name="" id="chkCheckedAll" />
                                        </th>
                                        <th>Student Name</th>
                                        <th>Roll No</th>
                                        <th>Student Id</th>
                                        <th>Department</th>
                                        <th>Year</th>
                                        <th>Section</th>
                                        <th>Gender</th>
                                        <th>Type</th>
                                        <th>Primary Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.createStudentRows(this.state.studentData.mutateResult)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default graphql(GET_STUDENT_DETAILS_DATA, {
    options: ({ }) => ({
        variables: {
            collegeId: 1801,
            academicYearId: 1701
        }
    })
})(withLoadingHandler(graphql(STUDENT_DETAILS, {
    name: "mutate"
})(StudentsDetails)));