// 몇 번 실패 시행을 했었는지 출력하는 기능을 추가했습니다.
// 몇 번 힌트를 보았는지 출력하는 기능을 추가했습니다.
// 1초동안 힌트를 볼 수 있는 기능을 추가했습니다.

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
const color = ['red', 'red', 'orange', 'orange', 'green', 'green', 'blue', 'blue', 'Aquamarine', 'Aquamarine', 'Hotpink', 'Hotpink', 'Indigo', 'Indigo', 'Saddlebrown', 'Saddlebrown'];
shuffle(color);
for(let i = 0; i < 16; i++){
    document.getElementById(`${i}`).style.backgroundColor = color[i];
}

let openCard = [];
let correctCard = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
let correctCount = 0;
let failCount = 0;
let hintCount = 0;
setTimeout(() => {
    for(let i = 0; i < 16; i++){
        let card = document.getElementById(`${i}`);
        card.style.backgroundColor = 'gray';
        card.addEventListener('click', () => {
            card.style.backgroundColor = color[i];
            if(!correctCard[i]){
                openCard.push(i);
                if(openCard.length === 2){
                    if(openCard[0] === openCard[1]){
                        openCard = [i];
                    } else if(color[openCard[0]] !== color[openCard[1]]){
                        let stopFunc = (event) => {event.preventDefault(); event.stopPropagation(); return false; } 
                        for(let j = 0; j < 16; j++){
                            document.getElementById(`${j}`).addEventListener('click', stopFunc, true);
                        }
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve();
                            }, 500);
                        }).then(() => {
                            document.getElementById(`${openCard[0]}`).style.backgroundColor = 'gray';
                            document.getElementById(`${openCard[1]}`).style.backgroundColor = 'gray';
                            failCount++;
                            openCard = [];
                        }).then(() => {
                            for(let j = 0; j < 16; j++){
                                document.getElementById(`${j}`).removeEventListener('click', stopFunc, true);
                            }
                        })
                    } else{
                        correctCount += 2;
                        correctCard[openCard[0]] = true;
                        correctCard[openCard[1]] = true;
                        openCard = [];
                    }
                }
                if(correctCount == 16){
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve();
                        }, 500);
                    }).then(() => {
                        // 몇 번 실패 시행을 했었는지, 힌트를 보았는지 출력하는 코드
                        if(confirm(`${failCount}번의 실패 시행을 하였습니다.\n${hintCount}번의 힌트 보기를 사용하였습니다.\n실패 시행과 힌트 보기를 줄여보세요!!\n재시작하시겠습니까?`) == true){
                            location.reload();
                        }
                    })
                }
            }
        })
    }
}, 3000);
document.getElementById('btn1').addEventListener('click', () => {
    location.reload();
});
// 1초동안 힌트를 보도록 하는 코드
document.getElementById('btn2').addEventListener('click', () => {
    for(let i = 0; i < 16; i++){
        if(correctCard[i] === false){
            document.getElementById(`${i}`).style.backgroundColor = color[i];
        }
    }
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    }).then(() => {
        for(let i = 0; i < 16; i++){
            if(correctCard[i] === false){
                document.getElementById(`${i}`).style.backgroundColor = 'gray';
            }
        }
    })
    hintCount++;
});