function validateForm(){
    let nama = document.querySelector('#nama').value;
    let umur = document.querySelector('#umur').value;

    if(nama == '' || umur == ''){
        alert('Data tidak boleh kosong');
        return false;
    }

    return true
}


function showData(){
    let data;
    if (localStorage.getItem('data') == null) {
        data = [];
    }else{
        data = JSON.parse(localStorage.getItem('data')) //nyimpen data ke localStoragenya 
    }

    // untuk menampilkan datanya 
    let html = "";
    data.forEach(function (element, index){
        html += `<tr>`;
        html += `<td>${element.nama}</td>`;
        html += `<td>${element.umur}</td>`;
        html += `<td>
                    <button class="btn btn-edit" onclick="updateData(${index})">Edit</button>
                    <button class="btn btn-remove" onclick="deleteData(${index})">Delete</button>
                </td>`;
        html += `<tr>`;
    })

    document.querySelector('#tableData tbody').innerHTML = html;
}



// ketika halaman melakukan refresh maka akn menamoilkan data yang ada di showData 
document.onload = showData();



// menambahkan data ke localStorage 
function addData(){
    if (validateForm() == true) {
        let nama = document.querySelector('#nama').value;
        let umur = document.querySelector('#umur').value;

        let data;
        if (localStorage.getItem('data') == null) {
            data = []
        }else{
            data = JSON.parse(localStorage.getItem('data'))
        }

        // ngirim ke variable data yg isinya dari let nama&umur 
        data.push({
            nama:nama,
            umur:umur,
        });

        localStorage.setItem('data', JSON.stringify(data)); //simpan data ke localStorage 
        showData(); //untuk menampilkan data yg baru di perbarui atau data yg baru ditambahkan 
      
        // document.getElementById('nama').value = "";
        // document.getElementById('umur').value = "";
    }
}


function deleteData(index) {
    let data;
    if (localStorage.getItem('data') == null) {
        data = []
    }else{
        data = JSON.parse(localStorage.getItem('data'))
    }

    data.splice(index, 1) //hapus sesuai indexnya dan hanya 1 data saja yg di hapus 
    localStorage.setItem('data', JSON.stringify(data));
    showData();
}


function updateData(index) {
    document.querySelector('.submit').style.display = "none";
    document.querySelector('.update').style.display = "block";
  
    let data;
    if (localStorage.getItem('data') == null) {
      data = [];
    } else {
      data = JSON.parse(localStorage.getItem('data'));
    }
  
    document.getElementById('nama').value = data[index].nama;
    document.getElementById('umur').value = data[index].umur;
  
    document.querySelector('.update').onclick = function() {
      if (validateForm() == true) {
        data[index].nama = document.getElementById('nama').value;
        data[index].umur = document.getElementById('umur').value;
        localStorage.setItem('data', JSON.stringify(data)); // Perbarui penyimpanan lokal dengan data yang diperbarui
        showData();
       
        // document.getElementById('nama').value = "";
        // document.getElementById('umur').value = "";
        
        document.querySelector('.submit').style.display = "block";
        document.querySelector('.update').style.display = "none";
      }
    };
  }
  
