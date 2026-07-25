let editId = null;

const form = document.getElementById("studentForm");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const message = document.getElementById("message");

async function loadStudents() {

    const response = await fetch("/api/students");
    const students = await response.json();

    let html = "";

    students.forEach((student, index) => {

        html += `
        <tr>

            <td>${index + 1}</td>

            <td>${student.username}</td>

            <td>${student.city}</td>

            <td>${student.qualification}</td>

            <td>

                <div class="action-buttons">

                    <button
                        class="edit-btn"
                        onclick="editStudent('${student._id}')">
                        ✏ Edit
                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteStudent('${student._id}')">
                        🗑 Delete
                    </button>

                </div>

            </td>

        </tr>
        `;

    });

    document.getElementById("students").innerHTML = html;

}

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const data = {

        username: document.getElementById("username").value,

        city: document.getElementById("city").value,

        qualification: document.getElementById("qualification").value

    };

    if(editId){

        await fetch(`/api/students/${editId}`,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        message.innerHTML = "Student Updated Successfully";

        editId = null;

        submitBtn.innerHTML = "Save Student";

        cancelBtn.style.display = "none";

    }
    else{

        await fetch("/api/students",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        message.innerHTML = "Student Saved Successfully";

    }

    form.reset();

    loadStudents();

});

async function editStudent(id){

    const response = await fetch("/api/students");

    const students = await response.json();

    const student = students.find(s => s._id === id);

    document.getElementById("username").value = student.username;

    document.getElementById("city").value = student.city;

    document.getElementById("qualification").value = student.qualification;

    editId = id;

    submitBtn.innerHTML = "Update Student";

    cancelBtn.style.display = "inline-block";

}

cancelBtn.addEventListener("click", () => {

    editId = null;

    form.reset();

    submitBtn.innerHTML = "Save Student";

    cancelBtn.style.display = "none";

    message.innerHTML = "";

});

async function deleteStudent(id){

    if(!confirm("Delete this student?")){

        return;

    }

    await fetch(`/api/students/${id}`,{

        method:"DELETE"

    });

    message.innerHTML = "Student Deleted Successfully";

    loadStudents();

}

loadStudents();
