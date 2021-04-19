import React from 'react'

function MainNotice() {
    return (
      <div className="mainNotice">
        這是一個提供活動點子的表單，徵求的是各種公司活動的建議，比方說跟投資、遊戲、動漫或是電影有關的聚會或是直播主題
        。
        <br/>
        <br/>
        或者你只是想在某一天的午後來一場狼人殺。
        <br/>
        <br/>
        {/* 由於我們不希望是無效的提議，所以必須記名提案。這樣也方便我們在日後可以隆重感謝你的點子。 */}
        一開始我們希望是拋磚引玉，所以可以匿名提供意見，但還是希望能留下你的暱稱，謝謝。
        <br/>
        非常感謝你。<br/>
        行銷組
      </div>
    )
}

export default MainNotice
