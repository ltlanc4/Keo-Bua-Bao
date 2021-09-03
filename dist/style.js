const VALUES = [
    {id: 'scissors', value: '✌️'},
    {id: 'rock', value: '✊'},
    {id: 'paper', value: '🖐️'}
];

let i = 0; //biến toàn cục
//Hàm này có nhiệm vụ dzì: Thay đổi kết quả của thằng bot
const handleChange = () => {
    const computer = document.querySelector('#computer');
    computer.textContent = VALUES[i].value;
    //tạo attribute data-id = VALUES[i].id
    computer.dataset.id = VALUES[i].id;

    if(i === VALUES.length - 1){
        i = 0;
    } else {
        i++;
    }
};
//JS nó cung cấp cho mình 1 hàm lặp đi lặp lại 1 callback trong 1 thời gia đặt ra
//setInterval(callBack, milisecond)
//function return ra 1 key giúp ngừng hành động gọi liên tục
//clearInterval(interval) giúp ngưng sự lặp lại này.
let interval = setInterval(handleChange, 100);

//Mảng lưu các node của người chơi
const playerItem = document.querySelectorAll('.user');
//làm hàm so sánh kết quả
//trả ra cho mình 1 0 -1
const compare = (valuePlayer, valueComputer) => {
    const indexUser = VALUES.findIndex(item => item.id === valuePlayer);
    const indexComputer = VALUES.findIndex(item => item.id === valueComputer);
    let check = indexUser - indexComputer;
    //1, -2
    if([1, -2].includes(check)) {
        return 1;
    } else if(check === 0) {
        return 0;
    } else {
        return - 1;
    }
}

//làm sự kiện khi click vô 1 lựa chọn
playerItem.forEach(item => {
    item.addEventListener('click', event => {
        clearInterval(interval);
        playerItem.forEach(_item => {
            //remove actived mỗi lần click
            _item.classList.remove('actived');
            //pointerEvents = 'none' - không cho click nữa 
            _item.style.pointerEvents = 'none';
        })
        event.target.classList.add('actived');
        const playerValue = event.target.id;
        const computerValue = document.querySelector('#computer').dataset.id;
        let result = compare(playerValue, computerValue);
        //Tạo 1 thông báo
        const newAlert = document.createElement('div');
        newAlert.classList.add('alert');
        let msg = '';
        if(result === 1) {
            msg = 'Bạn Thắng';
            newAlert.classList.add('alert-success');
        } else if(result === 0) {
            msg = 'Bạn Hòa';
            newAlert.classList.add('alert-warning');
        } else {
            msg = 'Bạn Thua'
            newAlert.classList.add('alert-dark');
        }
        newAlert.textContent = msg;
        document.querySelector('.notification').appendChild(newAlert);
        document.querySelector('#play-again').classList.remove('d-none');
    });
});

document.querySelector('.btn-play-again').addEventListener('click', event => {
    document.querySelector('#play-again').classList.add('d-none');
    //Cho máy change tiếp
    clearInterval(interval);
    interval = setInterval(handleChange, 100);
    //Bỏ actived
    playerItem.forEach(item => {
        item.classList.remove('actived');
        item.style.pointerEvents = '';
    });
    //
    document.querySelector('.notification').innerHTML = '';
});