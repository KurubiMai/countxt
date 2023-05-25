// ーーーーーーーーーー文字数カウントーーーーーーーーーーーーーーー
const textArea = document.getElementById("textArea");
const title = document.getElementById("memoTitle");
const txtCount1 = document.getElementById("txtCount-1");
const txtCount2 = document.getElementById("txtCount-2");

// 文字数をカウントする関数
countTexts = () => {
  const text = textArea.value;
  const textLength = text.replace(/\n+/g, '').length;
  const textLengthWithoutSpaces = text.replace(/\s+/g, '').length;

  // 現在の文字数を表示
  txtCount1.textContent = textLength;

  // 現在の文字数（空白のカウント無し）を表示
  txtCount2.textContent = textLengthWithoutSpaces;
}

// イベントリスナーを追加
title.addEventListener('input',countTexts);
textArea.addEventListener("input", countTexts);

// 初期文字数(0)を表示
countTexts();


// ーーーーーーーーーーーーーリスト要素とそれに紐づくローカルストレージを生成する関数
const addMemo = () => {
    const timestamp = new Date();
    const memoList =document.getElementById('memoList');
    const newId = uuid.v4();
    // 以下for文でidをローカルストレージ以外から取得できる方法を考える。(タイムスタンプ案)
    const obj ={titleData : '無題のメモ', textData : '', time: timestamp};
    localStorage.setItem(newId, JSON.stringify(obj));
    let admemo = `
        <li id="${newId}" class="list">
            <svg class="memoIcon" width="14" height="17" viewBox="0 0 14 17"  fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.70001 1H2.45001C2.05219 1 1.67066 1.15804 1.38935 1.43934C1.10805 1.72064 0.950012 2.10218 0.950012 2.5V14.5C0.950012 14.8978 1.10805 15.2794 1.38935 15.5607C1.67066 15.842 2.05219 16 2.45001 16H11.45C11.8478 16 12.2294 15.842 12.5107 15.5607C12.792 15.2794 12.95 14.8978 12.95 14.5V6.25L7.70001 1Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.70003 1V6.25H12.95" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="titleText">${JSON.parse(localStorage.getItem(newId)).titleData}</p>
            <svg class="dustIcon" width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.950012 4.79997H2.85001H18.05" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.1499 4.8V18.1C16.1499 18.6039 15.9498 19.0872 15.5934 19.4435C15.2371 19.7998 14.7539 20 14.2499 20H4.74995C4.24603 20 3.76276 19.7998 3.40644 19.4435C3.05012 19.0872 2.84995 18.6039 2.84995 18.1V4.8M5.69995 4.8V2.9C5.69995 2.39609 5.90012 1.91282 6.25644 1.5565C6.61276 1.20018 7.09603 1 7.59995 1H11.3999C11.9039 1 12.3871 1.20018 12.7434 1.5565C13.0998 1.91282 13.2999 2.39609 13.2999 2.9V4.8" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.6001 9.54997V15.25" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.4 9.54997V15.25" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </li>`;
    // ulの一番最初にリスト要素を追加する
    memoList.insertAdjacentHTML ('afterbegin' , admemo);
    // 一意のリスト要素をクリックしたときにselectlistを発動する（選択させる）
    const clickId = document.getElementById(newId);
    clickId.addEventListener('click',() => {
        selectList(newId);
    });
    selectList(newId);
    modalOpen();
}

console.log(localStorage);

//---------------選択する関数
let number ;
const selectList = (id) => {
    // 他のリストにクラスが与えられている場合、初期化
    const removelist =document.querySelector('.active');
    if (removelist) {
        removelist.classList.remove('active');
    }
    // activeクラスの再配分
    const list =document.getElementById(id);
    list.classList.add('active');
    
    // 選択されると右側を表示
    let right = document.getElementById("textAreaAll");
    right.style.visibility = "visible";
    right.classList.add('up');

    // ローカルストレージから任意のidのデータを取得
    let getKey = JSON.parse(localStorage.getItem(id.toString()));
    console.log(getKey);

    // ローカルストレージから取得した任意のidのtextData,titleDataを、右に表示させる
    title.value = getKey.titleData;
    textArea.value = getKey.textData;

    // 指定されたidのあるlist要素に繋がっているデータの文字カウント実行
    countTexts(id);

    number = id
};



// タイトルを保存する
title.addEventListener('input',() =>{
    let updateObj = {titleData : title.value, textData : textArea.value, time: new Date()};
    localStorage.setItem(number, JSON.stringify(updateObj));
    // ローカルストレージのタイトルデータを取得してリスト要素内のtitleTextに反映させる
    const listElement = document.getElementById(number,toString());
    let titleTextElement = listElement.querySelector(".titleText");
    titleTextElement.innerHTML = `${JSON.parse(localStorage.getItem(number)).titleData}`;
})
// テキストエリアを保存する
textArea.addEventListener('input',() =>{
    let updateObj = {titleData : title.value, textData : textArea.value, time: new Date()};
    localStorage.setItem(number, JSON.stringify(updateObj));
})


// ーーーーーーーページを読み込んだ時の処理
// ローカルストレージの全てのキーを取り出し、リスト要素に代入させmemoListの中に表示させる
// ローカルストレージのキーを取得
const getNewId = Object.keys(localStorage);
console.log(getNewId);
// pushされた要素を配列化させる定数
const getTimestanp = [];

// ローカルストレージから取得したキーをもとにタイムスタンプを取得し、配列にpushする
const loadContents = () => {
    for (let item of getNewId) {
        const getTime = JSON.parse(localStorage.getItem(item)).time;
        //　item,getTimeを配列化   
        getTimestanp.push({key: item, time: getTime});
    }
    
    // 配列化したgetTimestanpをソートで昇順にする
    getTimestanp.sort((a, b) => a.time < b.time ? 1 : -1);
    
    // ソートされた順にリスト要素として表示する
    for (let newGetTimestamp of getTimestanp) {
        const item = newGetTimestamp.key;
        let admemo = `
            <li id="${item}" class="list">
                <svg class="memoIcon" width="14" height="17" viewBox="0 0 14 17"  fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.70001 1H2.45001C2.05219 1 1.67066 1.15804 1.38935 1.43934C1.10805 1.72064 0.950012 2.10218 0.950012 2.5V14.5C0.950012 14.8978 1.10805 15.2794 1.38935 15.5607C1.67066 15.842 2.05219 16 2.45001 16H11.45C11.8478 16 12.2294 15.842 12.5107 15.5607C12.792 15.2794 12.95 14.8978 12.95 14.5V6.25L7.70001 1Z" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.70003 1V6.25H12.95" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="titleText">${JSON.parse(localStorage.getItem(item)).titleData}</p>
                <svg class="dustIcon" width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.950012 4.79997H2.85001H18.05" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16.1499 4.8V18.1C16.1499 18.6039 15.9498 19.0872 15.5934 19.4435C15.2371 19.7998 14.7539 20 14.2499 20H4.74995C4.24603 20 3.76276 19.7998 3.40644 19.4435C3.05012 19.0872 2.84995 18.6039 2.84995 18.1V4.8M5.69995 4.8V2.9C5.69995 2.39609 5.90012 1.91282 6.25644 1.5565C6.61276 1.20018 7.09603 1 7.59995 1H11.3999C11.9039 1 12.3871 1.20018 12.7434 1.5565C13.0998 1.91282 13.2999 2.39609 13.2999 2.9V4.8" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.6001 9.54997V15.25" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.4 9.54997V15.25" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </li>`;
        // ulの一番最初にリスト要素を追加する
        const memoList =document.getElementById('memoList');
        memoList.insertAdjacentHTML ('beforeend' , admemo);
        // 一意のリスト要素をクリックしたときにselectlistを発動する（選択させる）
        const clickId = document.getElementById(item);
        clickId.addEventListener('click',() => {
            selectList(item);
        });
        modalOpen();
    }
}

// ーーーーーーーーーーボタンを押されたら新規メモを作成する
const button = document.getElementById('newMemo');
button.addEventListener('click', addMemo);

// ul内リストの一番上を選択する関数
const firstListSelect = () =>{
    const gtList = document.getElementById("memoList");
    const firstLIst = gtList.firstElementChild.id
    console.log(firstLIst);
    selectList(firstLIst);
}

// --------------------モーダルを表示
const modalOpen = () => {
    const getDustIcon = document.getElementsByClassName('dustIcon');
    for (let i=0; i < getDustIcon.length; i++){
        console.log(getDustIcon);
        getDustIcon[i].onclick = () => {
            let modal = document.getElementById("ModalId");
            modal.style.display = "block";
        }
    }
}

// モーダルを非表示
const getCancel = document.getElementById("cancel-btn");
getCancel.onclick = () => {
    let modal = document.getElementById("ModalId");
    modal.style.display = "none";
}

// ローカルストレージの一意のデータを削除
const getDelete = document.getElementById("delete-btn");
getDelete.onclick = () => {
    localStorage.removeItem(number);
    let modal = document.getElementById("ModalId");
    modal.style.display = "none";
    document.getElementById(number).remove();
    // 削除後
    if (localStorage.length === 0){
        addMemo();
    }
    firstListSelect();
}


// ーーーーーーーーーローカルストレージにデータが一つもない場合は新しいメモを追加、一つ以上ある場合はそれらを読み込んで表示
if (getNewId.length === 0) {
    addMemo();
}else {
    loadContents();
    firstListSelect();
}