function postInfo() {
    const rbs = document.querySelectorAll('input[name="gender"]');
        let selectedValue;
        for (const rb of rbs) {
            if (rb.checked) {
                selectedValue = rb.value;
                break;
            }
        }
    var firstname = document.getElementById("firstname").value;
    var middlename = document.getElementById("middlename").value;
    var lastname = document.getElementById("lastname").value;
    var course = document.getElementById("course").value;
    var gender = selectedValue;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;

    var table = document.getElementById("table");
    var newRow = table.insertRow(table.length),
      col1 = newRow.insertCell(0);
      col2 = newRow.insertCell(1);
      col3 = newRow.insertCell(2);
      col4 = newRow.insertCell(3);
      col5 = newRow.insertCell(4);

      col1.innerHTML = firstname + " " + middlename + " " + lastname;
      col2.innerHTML = gender;
      col3.innerHTML = course;
      col4.innerHTML = phone;
      col5.innerHTML = address;

      document.getElementById("registration").reset();
}
