//html が読み込み終わった後に動作
document.addEventListener("DOMContentLoaded", function(){
  //iniファイルから情報を読み、表を作成
  read_iniTable();
  table_ddSort()
});


async function read_iniTable() {
  var projectNumber =3;
  var projectLeftTeamName = 2;
  var projectRightTeamName = 4;
  var leftMembers = 0;
  var rightMembers = 1;

  let iniData = await eel.openInifile_py()();//戻り値がpythonで取得したiniファイルの中身
  save_storage(iniData);//webstorageに保存

  for(var index=0; index < projectNumber; index++){
    var targetHeader = document.getElementById("left_header" + String(index + 1));
    targetHeader.insertAdjacentHTML("beforeend", iniData[index][projectLeftTeamName]);
    targetHeader = document.getElementById("right_header" + String(index + 1));
    targetHeader.insertAdjacentHTML("beforeend", iniData[index][projectRightTeamName]);

    let table_elements = await eel.iniCreateTable_py(iniData[index])();
    var targetRow = document.getElementById("left_row" + String(index + 1))
    for(var innerIndex=0; innerIndex < table_elements[leftMembers].length; innerIndex++){
      targetRow.insertAdjacentHTML("beforeend", table_elements[leftMembers][innerIndex]);
    }
    targetRow = document.getElementById("right_row" + String(index + 1))
    for(var innerIndex=0; innerIndex < table_elements[rightMembers].length; innerIndex++){
      targetRow.insertAdjacentHTML("beforeend", table_elements[rightMembers][innerIndex]);
    }
  }

  console.log(iniData);
  console.log(table_elements);
}


//webstorageに保存
function save_storage(data_list){
  for(var index=0; index < data_list.length; index++){
    localStorage.setItem("project" + String(index + 1), JSON.stringify(data_list[index]));
  }
}

function extraction_storage(){
  var projectNumber = 3;
  
  for(var index=0; index < projectNumber; index++){
    const storage_info = JSON.parse(localStorage.getItem("project" + String(index + 1)));
  }
  return storage_info;
}


//tableの順番を変えた際にインデックスとrowのinputクラスも変更する。
function changeTableInfo(tableId){
  const tableRows = document.getElementById(tableId);
  const tableRowsLength = tableRows.rows.length;

  for(var index=0; index < tableRowsLength; index++){
    tableRows.rows[index].cells[0].innerText = String(index + 1) + ".";
  }
}

//sortable.js　の実装
function table_ddSort(){
  projectNumber = 3;

  var sortable = Sortable.create(left_row1,{
    group: "left1",
    animation: 100,
    handle: ".numberClass",
    filter:".memberclass",
    onEnd: function(evt){
      console.log(evt.oldIndex, evt.newIndex);
      changeTableInfo("left_row1");
    },
    
  });
  var sortable = Sortable.create(left_row2,{
    group: "left2",
    animation: 100,
    handle: ".numberClass",
    filter:".memberclass",
    onEnd: function(evt){
      console.log(evt.oldIndex, evt.newIndex);
      changeTableInfo("left_row2");
    },
  });
  var sortable = Sortable.create(left_row3,{
    group: "left3",
    animation: 100,
    handle: ".numberClass",
    filter:".memberclass",
    onEnd: function(evt){
      console.log(evt.oldIndex, evt.newIndex);
      changeTableInfo("left_row3");
    },
  });
  var sortable = Sortable.create(right_row1,{
    group: "right1",
    animation: 100,
    handle: ".numberClass",
    filter:".memberclass",
    onEnd: function(evt){
      console.log(evt.oldIndex, evt.newIndex);
      changeTableInfo("right_row1");
    },
  });
  var sortable = Sortable.create(right_row2,{
    group: "right2",
    animation: 100,
    handle: ".numberClass",
    filter:".memberclass",
    onEnd: function(evt){
      console.log(evt.oldIndex, evt.newIndex);
      changeTableInfo("right_row2");
    },
  });
  var sortable = Sortable.create(right_row3,{
    group: "right3",
    animation: 100,
    handle: ".numberClass",
    filter:".memberclass",
    onEnd: function(evt){
      console.log(evt.oldIndex, evt.newIndex);
      changeTableInfo("right_row3");
    },
  });

}
