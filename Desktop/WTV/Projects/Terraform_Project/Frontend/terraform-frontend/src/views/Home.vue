<template>
    <div>
        <div class="pl-4 d-flex justify-center align-center" style="background-color: #68ada2; height: 50px;">
            <p class="ma-0 pa-0 mainheading" align="center">KBX STUDENT MANAGEMENT</p>
        </div>

        <div class="pa-4">
            <!-- Top 5 Students -->
            <div>
                <div>
                    <div class="pb-4 d-flex justify-space-between align-center">
                        <div>
                            <p class="ma-auto heading" align="left">All Students</p>
                        </div>

                        <div class="pr-4">
                            <v-btn color="#68ada2" @click="addStudentPopUp()">Add Student</v-btn>
                        </div>
                    </div>

                    <div style="overflow: scroll; overflow: hidden; height: 45px 0px">
                        <table class="tableClass" v-if="students.length > 0">
                            <tr>
                                <th align="left">Student ID</th>
                                <th align="left">Student Name</th>
                                <th align="left">Department</th>
                                <th align="left">CGPA</th>
                                <th align="left">Actions</th>
                            </tr>

                        <tr v-for="student in students" :key="student.id">
                            <td align="left">
                                {{ student.sk }}
                            </td>
                            <td align="left">
                                {{ student.name }}
                            </td>
                            <td align="left">
                                {{ student.department }}
                            </td>
                            <td align="left">
                                {{ student.cgpa }}
                            </td>
                            <td>
                                <div class="pa-2" @click="editPopUpOpen(student)">
                                <v-btn color="#68ada2">Edit</v-btn>
                                </div>
                            </td>
                        </tr>

                        </table>
                    </div>
                </div>
            </div>

            <!-- Edit Popup -->
            <v-dialog v-model="editPopUpFlag" max-width="1000">
                <v-card elevation="2">
                    <v-card-title style="word-break: normal;">
                        Edit Student
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <div>
                                <p style="text-align:left">Student Name<span style="color: red"></span></p>
                            </div>

                            <div>
                                <v-text-field
                                    v-model="editedStudentName"
                                    :placeholder="editedStudent.name"
                                    solo
                                    disabled
                                >
                                </v-text-field>
                            </div>
                        </div>

                        <div>
                            <div>
                                <p style="text-align:left">CGPA</p>
                            </div>

                            <div>
                                <v-text-field v-model="editedCGPA"
                                    placeholder="Enter CGPA Here"
                                    solo
                                >
                                </v-text-field>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions style="display:flex; justify-content:flex-end">
                        <div class="px-2">
                            <v-btn
                                color="primary"
                                width="100px"
                                @click="editStudent()"
                            >
                                Save
                            </v-btn>
                        </div>

                        <div class="px-2">
                            <v-btn
                                color="primary"
                                width="100px"
                                @click="editPopUpClose()"
                            >
                                Cancel
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!-- Add Popup -->
            <!-- Edit Popup -->
            <v-dialog v-model="addStudentFlag" max-width="1000">
                <v-card elevation="2">
                    <v-card-title style="word-break: normal;">
                        Add Student
                    </v-card-title>
                    <v-card-text>
                        <div>
                            <div>
                                <p style="text-align:left">Student ID<span style="color: red"></span></p>
                            </div>

                            <div>
                                <v-text-field
                                    v-model="addedStudentId"
                                    placeholder="Enter Student ID"
                                    solo
                                >
                                </v-text-field>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p style="text-align:left">Student Name<span style="color: red"></span></p>
                            </div>

                            <div>
                                <v-text-field
                                    v-model="addedStudentName"
                                    placeholder="Enter Student Name"
                                    solo
                                >
                                </v-text-field>
                            </div>
                        </div>

                        <div>
                            <div>
                                <p style="text-align:left">Department</p>
                            </div>

                            <div>
                                <v-text-field v-model="addedDepartment"
                                    placeholder="Enter Department Here"
                                    solo
                                >
                                </v-text-field>
                            </div>
                        </div>

                        <div>
                            <div>
                                <p style="text-align:left">CGPA</p>
                            </div>

                            <div>
                                <v-text-field v-model="addedCGPA"
                                    placeholder="Enter CGPA Here"
                                    solo
                                >
                                </v-text-field>
                            </div>
                        </div>
                    </v-card-text>
                    <v-card-actions style="display:flex; justify-content:flex-end">
                        <div class="px-2">
                            <v-btn
                                color="primary"
                                width="100px"
                                @click="addStudent()"
                            >
                                Save
                            </v-btn>
                        </div>

                        <div class="px-2">
                            <v-btn
                                color="primary"
                                width="100px"
                                @click="addPopUpClose()"
                            >
                                Cancel
                            </v-btn>
                        </div>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      students: [],
      editPopUpFlag: false,
      editedStudent: {},
      editedStudentName: '',
      editedCGPA: '',
      addStudentFlag: false,
      addedStudentId: '',
      addedStudentName: '',
      addedDepartment: '',
      addedCGPA: '',
    };
  },
  mounted() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/students`).then((getStudentsResponse) => {
      this.students = getStudentsResponse.data.data;
      console.log(this.students);
    }).catch((getStudentsError) => {
      console.log('Error : ', getStudentsError);
    });

    // this.students = [
    //     {
    //     'id': 'KBX001',
    //     'name': 'Srinath',
    //     'department': 'TNMT',
    //     'CGPA': '10',
    //     },
    //     {
    //     'id': 'KBX005',
    //     'name': 'Deepika',
    //     'department': 'TNMT',
    //     'CGPA': '10',
    //     },
    //     {
    //     'id': 'KBX002',
    //     'name': 'Vishwanth',
    //     'department': 'TNMT',
    //     'CGPA': '10',
    //     },
    //     {
    //     'id': 'KBX003',
    //     'name': 'Guru',
    //     'department': 'TNMT',
    //     'CGPA': '10',
    //     },
    //     {
    //     'id': 'KBX004',
    //     'name': 'Nitin',
    //     'department': 'TNMT',
    //     'CGPA': '10',
    //     }
    // ];
  },
  methods: {
    addStudentPopUp() {
      this.addStudentFlag = true;
    },
    addPopUpClose() {
      this.addStudentFlag = false;
    },
    addStudent() {
      const insertRequest = {
        id: this.addedStudentId,
        name: this.addedStudentName,
        department: this.addedDepartment,
        cgpa: this.addedCGPA,
      };
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/insert`, insertRequest).then((insertResponse) => {
        this.students = insertResponse.data.data;
        this.addStudentFlag = false;
        this.$router.go();
      }).catch((insertError) => {
        console.log('Error : ', insertError);
      });
      // this.students.push({
      //     id: this.addedStudentId,
      //     name: this.addedStudentName,
      //     department: this.addedDepartment,
      //     CGPA: this.addedCGPA
      // });
      // this.addedStudentId = '';
      // this.addedStudentName = '';
      // this.addedDepartment = '';
      // this.addedCGPA = '';
    },
    editPopUpOpen(student) {
      this.editedStudent = {
        id: student.sk,
        name: student.name,
        department: student.department,
        CGPA: student.cgpa,
      };
      this.editedStudentName = '';
      this.editedCGPA = '';
      this.editPopUpFlag = true;
    },
    editPopUpClose() {
      this.editPopUpFlag = false;
    },
    editStudent() {
      const updateCGPARequest = {
        id: this.editedStudent.id,
        cgpa: this.editedCGPA,
      };
      axios.put(`${process.env.VUE_APP_BACKEND_URL}/updateCGPA`, updateCGPARequest).then((updateCGPAResponse) => {
        this.students = updateCGPAResponse.data.data;
        this.editPopUpFlag = false;
        this.$router.go();
      }).catch((updateCGPAError) => {
        console.log('Error : ', updateCGPAError);
      });
    },
  },
};
</script>

  <style>
  .mainheading{
    font-size: 24px;
    font-weight: 800;
  }

  .heading{
    font-size: 20px;
    font-weight: 600;
  }
  </style>

  <style scoped>

  td, th {
    /* border: 0px; */
    border:1px solid black;
  }

  td {
    padding: 4px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }

  th {
    background-color: #204143;
    color: white;
    font-size: 18px;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 0;
    height: 40px;
    text-align: center;
    padding: 4px;
  }

  tr {
    border-bottom: #d4eeff 1px solid !important;
    padding: 4px;
  }
  .tableClass {
    border-spacing: 0px;
    width: 100%;
    border-collapse: collapse;
    z-index: 0;
    background-color: white;
  }
  </style>
