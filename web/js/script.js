//メンバーや対抗戦の種類を登録する画面の作成
function create_entry_box(){
  for(var event_number=1; event_number<=3; event_number++){
    var event_snumber = String(event_number);
    var event_id = "event" + event_snumber;
    var event_name = "name='entry" + event_snumber + "'"

    var entry = "<form " + event_name + ">"
    + "<div class='title_box'>企画名<br><input type='text' name='title' placeholder='ex) 交流戦'></div>"
    + "<div class='rule_box'>"
    + "<input type='radio' name='conpetition_type' value='stock' checked id='stock" + event_snumber + "'>"
    + "<label for='stock" + event_snumber + "' style='margin-right:20px'>ストック引継ぎ</label>"
    + '<input type="radio" name="conpetition_type" value="star" id="star' + event_snumber + '">'
    + '<label for="star' + event_snumber + '">星取り</label>'
    + "</div>"
    + '<div class="left_group_props">'
    + '<p>左側のグループ</p>'
    + '<div class="group_name"> <input type="text" name="left_group" placeholder="窓名等のグループ名を入力"> </div>'
    + '<textarea id="left_team" placeholder="メンバー名を入力\nex)\nひろき\nたつや" rows="15"></textarea>'
    + '</div>'
    + '<div class="right_group_props">'
    + '<p>右側のグループ</p>'
    + '<div class="group_name"> <input type="text" name="right_group" placeholder="窓名等のグループ名を入力"> </div>'
    + '<textarea name="right_team" placeholder="メンバー名を入力\nex)\nゆうき\nとおる" rows="15"></textarea>'
    + '</div>'
    + '<div><p>ルール</p></div>'
    + '<textarea name="rule" value="" cols="49" rows="6">・3スト/7分/星取り/スピリッツ,アイテム,ギミック無し/キャラ変更なし\n・ステージ：終点(終点化)→戦場(戦場化)\n\t　　→ポケスタ2→カロス→村と街\n■部屋ID：A1234 ■Pass：**</textarea>'
    + '</form>' 
    + '<input type="button" value="登録" onclick="entry_button(' + event_snumber + ')"/> <input type="button" value="クリア" onclick="delete_storage(' + event_snumber + ')"/>'
    + '<div id="member-condition' + event_snumber + '" >'
    + '</div>';

    document.getElementById(event_id).insertAdjacentHTML('beforeend', entry);

  }
}


//ボタンが押されたら、入力されたメンバー数分、表の行数を作成。
function entry_button(event_number){
  //event_numberは数値型
  switch(event_number) {
    case 1: const doc_form1 = document.forms.entry1;
            const entry_data_list1 = read_entry(doc_form1);
            if(entry_data_list1 !== void 0){ save_storage(entry_data_list1, String(event_number), true); }
            debug_textbox(doc_form1);//debug
            create_tables(String(event_number));
            break;
    case 2: const doc_form2 = document.forms.entry2;
            const entry_data_list2 = read_entry(doc_form2);
            if(entry_data_list2 !== void 0){ save_storage(entry_data_list2, String(event_number), true); }
            debug_textbox(doc_form2);//debug
            create_tables(String(event_number));
            break;
    case 3: const doc_form3 = document.forms.entry3;
            const entry_data_list3 = read_entry(doc_form3);
            if(entry_data_list3 !== void 0){ save_storage(entry_data_list3, String(event_number), true); }
            debug_textbox(doc_form3);//debug
            create_tables(String(event_number));
            break;
    default: console.log("1~3のみの入力です"); break;
  }
}


//企画ごとに登録
function read_entry(position){
  const conpetition_project_name = position.title.value;
  const rule = position.conpetition_type.value;
  const left_group_name = position.left_group.value;
  const left_members = add_member_property(split_data(position.left_team.value), rule);
  const right_group_name = position.right_group.value;
  const right_members = add_member_property(split_data(position.right_team.value), rule);
  const rules = position.rule.value;
  const entry_data = {conpetition_project_name, rule, left_group_name,left_members, right_group_name, right_members,rules}
  const check_bool = formcheck(entry_data);

  if(check_bool){
    return entry_data;
  }else{
    alert("入力していない項目があります。");
  }
}


//改行で分割してリストに格納 空白もしくは改行のみの行を削除
function split_data(text){
  const entry_member_list = text.split(/\n/)
  const member_list = entry_member_list.filter(function(s){
    return !(s === "" || s === "　" || s === " ");
  });
  return member_list;
}


//各メンバーに、ルールが
//ストック引継ぎの場合、自分のストック数、奪ストック数を代入。
//星取りの場合、勝敗を代入
function add_member_property(member_list, rule="none"){
  var forReturn_member_list = {};

  for(var index=0; index < member_list.length; index++){
    switch(rule){
      case "stock": forReturn_member_list[member_list[index]] = 3;
                    break;
      case "star":  forReturn_member_list[member_list[index]] = "-";
                    break;
      default:  console.log("ルールが設定されていません"); break;
    }
  }
  // console.log("forReturn_member_list = " + forReturn_member_list);
  return forReturn_member_list;
}


//フォームに入力されてるかどうかチェック
function formcheck(entry_data){
  var flag = 0;

  for(var index=0; index < Object.keys(entry_data).length; index++){
    if(entry_data[Object.keys(entry_data)[index]] === ""){
      flag = 1;
      break;
    }
  }
  if(flag === 0){
    return true;
  }else{
    return false;
  }
}


//ENTRY情報をwebstorageへ保存
function save_storage(data_list, event_number, first_timing=false){
  if(first_timing){
    localStorage.setItem(event_number, JSON.stringify(data_list));
  }else{
    console.log("未実装");
  }
  // console.log("data_list = " + data_list);
}


//webstorageの指定されたkeyをクリア
function delete_storage(snumber){
  localStorage.removeItem(snumber);
}


//webstorageからデータを読み込み、表を作る
function create_tables(snumber){
  const storage_info = extraction_storage_info(snumber);
  // const storage_left_members = storage_info["left_members"];
  // const storage_right_members = storage_info["right_members"];
  const team_div_element = document.createElement("div");
  team_div_element.id = "team_div" + snumber;
  const title_div_element = document.createElement("div");
  title_div_element.id = "title_div" + snumber;
  const left_team_div_element = document.createElement("div");
  left_team_div_element.classList.add("left_team_table_div");
  left_team_div_element.id = "left_team_table_div" + snumber;
  const right_team_div_element = document.createElement("div");
  right_team_div_element.classList.add("right_team_table_div");
  right_team_div_element.id = "right_team_table_div" + snumber;
  const left_team_table_element = document.createElement("table");
  left_team_table_element.id = "left_team_table" + snumber;
  const right_team_table_element = document.createElement("table");
  right_team_table_element.id = "right_team_table" + snumber;

  if(document.getElementById(team_div_element.id) === null){
    document.getElementById("member-condition" + snumber).appendChild(team_div_element);
    document.getElementById("team_div" + snumber).appendChild(title_div_element);//titleテキストボックスのdiv
    document.getElementById("team_div" + snumber).appendChild(left_team_div_element);//左側チームのdiv
    document.getElementById("left_team_table_div" + snumber).appendChild(left_team_table_element);
    document.getElementById("team_div" + snumber).appendChild(right_team_div_element);//右側チームのdiv
    document.getElementById("right_team_table_div" + snumber).appendChild(right_team_table_element);
  }

  // console.log(storage_info["left_members"]["a"]);
  // console.log(Object.keys(storage_left_members).length);
  table_detail(storage_info);
  // for(var index = 0; index < Object.keys(storage_left_members).length; index++){
  //   console.log(Object.keys(storage_left_members)[index]);
  // }
  // for(var index = 0; index < Object.keys(storage_right_members).length; index++){
  //   console.log(Object.keys(storage_right_members)[index]);
  // }
}


//webstorageから情報を取り出す
function extraction_storage_info(snumber){
  const storage_info = JSON.parse(localStorage.getItem(snumber)); //JSON形式で保存しているのでparseしてオブジェクトに戻さないといけない。
  return storage_info;
}


//各行の要素を生成
function table_detail(storage_info){
  var left_table_contents = [[storage_info.left_group_name]];
  var right_table_contents = [[storage_info.right_group_name]];
  var left_member_list = Object.entries(storage_info.left_members);
  var right_member_list = Object.entries(storage_info.right_members);

  if(storage_info.rule === "stock"){
    // [チーム名（テキストボックス）],
    // [順番（移動×）, 名前（テキストボックス）, 未戦勝ち負け(プルダウン)],
    // [順番（移動×）, 名前（テキストボックス）, 未戦勝ち負け(プルダウン)],
    //順番の部分は色を変える
    for(var index=0; index < Object.keys(storage_info.left_members); index++){
      left_member_list.unshift(String(index + 1) + ".");
      right_member_list.unshift(String(index + 1) + ".");
      left_table_contents.push(left_member_list[index]);
      right_table_contents.push(right_member_list[index]);
    }
    console.log("leftmemberlist", left_table_contents, "rightmemberlist", right_member_list);
    
  }else if(storage_info.rule === "star"){
    // [チーム名],
    // [順番（移動×）, 名前（テキストボックス）, 残りストック]
    // [順番（移動×）, 名前（テキストボックス）, 残りストック]
    //順番の部分は色を変える
    
  }
}


//テキストボックス　デバッグ用 あらかじめ文字入力しておく。
function debug_textbox(forms){
  forms.title.value = "title";
  forms.left_group.value = "left team";
  forms.right_group.value = "right team";
  forms.left_team.value = "a\nb\nc\nd\n";
  forms.right_team.value = "A\nB\nC\nD\n";
}


//html が読み込み終わった後に動作
document.addEventListener("DOMContentLoaded", function(){
  //メンバーや対抗戦の種類を登録する画面の作成
  create_entry_box();

  eel.expose(js_function);

});

function js_function(){
  console.log("python");
}




// function handleFileSelect(evt) {
//   var files = evt.target.files;
//   var output = [];
//   for (var i=0, f; f=files[i]; i++){
//     output.push("<li><strong>", escape(f.name), "</strong> (", f.type || "n/a", ") -", f.size, " byte, last modified: ", f.lastModifiedDate.toLocaleDateString(), "</li>");
//   }
//   document.getElementById("list").innerHTML = "<ul>" + output.join("") + "</ul>";
// }

// HTMLも上から読み込むので、すべて読み込んだ後にJavascriptを動かす必要がある。addEventListener"にDOMContentLoaded"を設定し、その後関数で処理を行うべきである.ちなみに、"change"は値が明示的に変更された場合に処理を行う設定である。
// document.addEventListener("DOMContentLoaded", function(){
//   document.getElementById("files").addEventListener("change", handleFileSelect, false);
// })
