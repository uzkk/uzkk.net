<template>
  <div>
    <h1>東方キャラソート・MF <span class="version">ver.1.17.0</span></h1>
    <div xmlns="http://www.w3.org/1999/xhtml" id="init" style="display: none;">
      <p class="description">お好みの基準でキャラのランキングを作ろう。好きなキャラ、大きなキャラ、その他色々。</p>
      <p class="description"><a href="../sort-sound/">東方原曲ソート・MF はこちら</a><br /><a href="../sort-player/">東方難易度ソート・MF はこちら</a></p>
      <h2>キャラクターの選択</h2>
      <div id="toggle-chars">
        <p id="toggle-chars-off" style="display: none;"><button onclick="toggle_chars(false);" value="0">作品単位にする</button><br /><span>簡易選択に戻す場合はこちら</span></p>
        <p id="toggle-chars-on"><button onclick="toggle_chars(true);" value="1">キャラ単位にする</button><br /><span>キャラを絞って早くソートを完了させたい場合はこちら</span></p>
        <p id="hint_select" style="display:none;">一度すべてチェックを外す事をおすすめします</p>
      </div>
      <div class="init_win">
      <fieldset class="official-titles">
      <legend>
        <label><input class="group-outer" checked="checked" type="checkbox" /><span>正伝(Win)</span></label>
      </legend>

      <ul class="titles">
        <li>
          <fieldset>
            <legend>
              <label><input class="group-inner" name="a" checked="checked" type="checkbox" /><span>東方紅魔郷</span></label>
            </legend>
            <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li class="last-player"><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="003" checked="checked" type="checkbox" /><span>ルーミア</span></label></li>
            <li><label><input class="char" value="004" checked="checked" type="checkbox" /><span>大妖精</span></label></li>
            <li><label><input class="char" value="005" checked="checked" type="checkbox" /><span>チルノ</span></label></li>
            <li><label><input class="char" value="006" checked="checked" type="checkbox" /><span>美鈴</span></label></li>
            <li><label><input class="char" value="007" checked="checked" type="checkbox" /><span>小悪魔</span></label></li>
            <li><label><input class="char" value="008" checked="checked" type="checkbox" /><span>パチュリー</span></label></li>
            <li><label><input class="char" value="009" checked="checked" type="checkbox" /><span>咲夜</span></label></li>
            <li><label><input class="char" value="010" checked="checked" type="checkbox" /><span>レミリア</span></label></li>
            <li><label><input class="char" value="011" checked="checked" type="checkbox" /><span>フランドール</span></label></li>
            </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="b" checked="checked" type="checkbox" /><span>東方妖々夢</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li class="last-player"><label><input class="char" value="009" checked="checked" type="checkbox" /><span>咲夜</span></label></li>
            <li><label><input class="char" value="005" checked="checked" type="checkbox" /><span>チルノ</span></label></li>
            <li><label><input class="char" value="012" checked="checked" type="checkbox" /><span>レティ</span></label></li>
            <li><label><input class="char" value="013" checked="checked" type="checkbox" /><span>橙</span></label></li>
            <li><label><input class="char" value="014" checked="checked" type="checkbox" /><span>アリス</span></label></li>
            <li><label><input class="char" value="120" checked="checked" type="checkbox" /><span>アリスの人形</span></label></li>
            <li><label><input class="char" value="015" checked="checked" type="checkbox" /><span>リリー</span></label></li>
            <li><label><input class="char" value="016" checked="checked" type="checkbox" /><span>ルナサ</span></label></li>
            <li><label><input class="char" value="017" checked="checked" type="checkbox" /><span>メルラン</span></label></li>
            <li><label><input class="char" value="018" checked="checked" type="checkbox" /><span>リリカ</span></label></li>
            <li><label><input class="char" value="019" checked="checked" type="checkbox" /><span>妖夢</span></label></li>
            <li><label><input class="char" value="020" checked="checked" type="checkbox" /><span>幽々子</span></label></li>
            <li><label><input class="char" value="021" checked="checked" type="checkbox" /><span>藍</span></label></li>
            <li><label><input class="char" value="022" checked="checked" type="checkbox" /><span>紫</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="c" checked="checked" type="checkbox" /><span>東方永夜抄</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="022" checked="checked" type="checkbox" /><span>紫</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="014" checked="checked" type="checkbox" /><span>アリス</span></label></li>
            <li><label><input class="char" value="120" checked="checked" type="checkbox" /><span>アリスの人形</span></label></li>
            <li><label><input class="char" value="010" checked="checked" type="checkbox" /><span>レミリア</span></label></li>
            <li><label><input class="char" value="009" checked="checked" type="checkbox" /><span>咲夜</span></label></li>
            <li><label><input class="char" value="019" checked="checked" type="checkbox" /><span>妖夢</span></label></li>
            <li class="last-player"><label><input class="char" value="020" checked="checked" type="checkbox" /><span>幽々子</span></label></li>
            <li><label><input class="char" value="024" checked="checked" type="checkbox" /><span>リグル</span></label></li>
            <li><label><input class="char" value="025" checked="checked" type="checkbox" /><span>ミスティア</span></label></li>
            <li><label><input class="char" value="026" checked="checked" type="checkbox" /><span>慧音</span></label></li>
            <li><label><input class="char" value="027" checked="checked" type="checkbox" /><span>てゐ</span></label></li>
            <li><label><input class="char" value="028" checked="checked" type="checkbox" /><span>うどんげ</span></label></li>
            <li><label><input class="char" value="029" checked="checked" type="checkbox" /><span>永琳</span></label></li>
            <li><label><input class="char" value="030" checked="checked" type="checkbox" /><span>輝夜</span></label></li>
            <li><label><input class="char" value="031" checked="checked" type="checkbox" /><span>妹紅</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="d" checked="checked" type="checkbox" /><span>東方花映塚</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="005" checked="checked" type="checkbox" /><span>チルノ</span></label></li>
            <li><label><input class="char" value="009" checked="checked" type="checkbox" /><span>咲夜</span></label></li>
            <li><label><input class="char" value="015" checked="checked" type="checkbox" /><span>リリー</span></label></li>
            <li><label><input class="char" value="016" checked="checked" type="checkbox" /><span>ルナサ</span></label></li>
            <li><label><input class="char" value="017" checked="checked" type="checkbox" /><span>メルラン</span></label></li>
            <li><label><input class="char" value="018" checked="checked" type="checkbox" /><span>リリカ</span></label></li>
            <li><label><input class="char" value="019" checked="checked" type="checkbox" /><span>妖夢</span></label></li>
            <li><label><input class="char" value="025" checked="checked" type="checkbox" /><span>ミスティア</span></label></li>
            <li><label><input class="char" value="027" checked="checked" type="checkbox" /><span>てゐ</span></label></li>
            <li><label><input class="char" value="028" checked="checked" type="checkbox" /><span>うどんげ</span></label></li>
            <li><label><input class="char" value="035" checked="checked" type="checkbox" /><span>文</span></label></li>
            <li><label><input class="char" value="036" checked="checked" type="checkbox" /><span>メディスン</span></label></li>
            <li><label><input class="char" value="037" checked="checked" type="checkbox" /><span>幽香</span></label></li>
            <li><label><input class="char" value="038" checked="checked" type="checkbox" /><span>小町</span></label></li>
            <li><label><input class="char" value="039" checked="checked" type="checkbox" /><span>映姫</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="e" checked="checked" type="checkbox" /><span>東方風神録</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li class="last-player"><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="045" checked="checked" type="checkbox" /><span>静葉</span></label></li>
            <li><label><input class="char" value="046" checked="checked" type="checkbox" /><span>穣子</span></label></li>
            <li><label><input class="char" value="047" checked="checked" type="checkbox" /><span>雛</span></label></li>
            <li><label><input class="char" value="048" checked="checked" type="checkbox" /><span>にとり</span></label></li>
            <li><label><input class="char" value="049" checked="checked" type="checkbox" /><span>椛</span></label></li>
            <li><label><input class="char" value="035" checked="checked" type="checkbox" /><span>文</span></label></li>
            <li><label><input class="char" value="050" checked="checked" type="checkbox" /><span>早苗</span></label></li>
            <li><label><input class="char" value="051" checked="checked" type="checkbox" /><span>神奈子</span></label></li>
            <li><label><input class="char" value="052" checked="checked" type="checkbox" /><span>諏訪子</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="f" checked="checked" type="checkbox" /><span>東方地霊殿</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li class="last-player"><label><input class="char" value="050" checked="checked" type="checkbox" /><span>早苗</span></label></li>
            <li><label><input class="char" value="053" checked="checked" type="checkbox" /><span>キスメ</span></label></li>
            <li><label><input class="char" value="054" checked="checked" type="checkbox" /><span>ヤマメ</span></label></li>
            <li><label><input class="char" value="055" checked="checked" type="checkbox" /><span>パルスィ</span></label></li>
            <li><label><input class="char" value="056" checked="checked" type="checkbox" /><span>勇儀</span></label></li>
            <li><label><input class="char" value="057" checked="checked" type="checkbox" /><span>さとり</span></label></li>
            <li><label><input class="char" value="058" checked="checked" type="checkbox" /><span>お燐</span></label></li>
            <li><label><input class="char" value="059" checked="checked" type="checkbox" /><span>お空</span></label></li>
            <li><label><input class="char" value="060" checked="checked" type="checkbox" /><span>こいし</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="g" checked="checked" type="checkbox" /><span>東方星蓮船</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li class="last-player"><label><input class="char" value="050" checked="checked" type="checkbox" /><span>早苗</span></label></li>
            <li><label><input class="char" value="063" checked="checked" type="checkbox" /><span>ナズーリン</span></label></li>
            <li><label><input class="char" value="064" checked="checked" type="checkbox" /><span>小傘</span></label></li>
            <li><label><input class="char" value="065" checked="checked" type="checkbox" /><span>一輪</span></label></li>
            <li><label><input class="char" value="066" checked="checked" type="checkbox" /><span>ムラサ</span></label></li>
            <li><label><input class="char" value="067" checked="checked" type="checkbox" /><span>星</span></label></li>
            <li><label><input class="char" value="068" checked="checked" type="checkbox" /><span>白蓮</span></label></li>
            <li><label><input class="char" value="069" checked="checked" type="checkbox" /><span>ぬえ</span></label></li>
            <li><label><input class="char" value="112" checked="checked" type="checkbox" /><span>雲山</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="h" checked="checked" type="checkbox" /><span>東方神霊廟</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="019" checked="checked" type="checkbox" /><span>妖夢</span></label></li>
            <li class="last-player"><label><input class="char" value="050" checked="checked" type="checkbox" /><span>早苗</span></label></li>
            <li><label><input class="char" value="070" checked="checked" type="checkbox" /><span>響子</span></label></li>
            <li><label><input class="char" value="064" checked="checked" type="checkbox" /><span>小傘</span></label></li>
            <li><label><input class="char" value="071" checked="checked" type="checkbox" /><span>芳香</span></label></li>
            <li><label><input class="char" value="072" checked="checked" type="checkbox" /><span>青娥</span></label></li>
            <li><label><input class="char" value="073" checked="checked" type="checkbox" /><span>屠自古</span></label></li>
            <li><label><input class="char" value="074" checked="checked" type="checkbox" /><span>布都</span></label></li>
            <li><label><input class="char" value="075" checked="checked" type="checkbox" /><span>神子</span></label></li>
            <li><label><input class="char" value="069" checked="checked" type="checkbox" /><span>ぬえ</span></label></li>
            <li><label><input class="char" value="076" checked="checked" type="checkbox" /><span>マミゾウ</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="i" checked="checked" type="checkbox" /><span>東方輝針城</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li class="last-player"><label><input class="char" value="009" checked="checked" type="checkbox" /><span>咲夜</span></label></li>
            <li><label><input class="char" value="124" checked="checked" type="checkbox" /><span>わかさぎ姫</span></label></li>
            <li><label><input class="char" value="125" checked="checked" type="checkbox" /><span>蛮奇</span></label></li>
            <li><label><input class="char" value="126" checked="checked" type="checkbox" /><span>影狼</span></label></li>
            <li><label><input class="char" value="127" checked="checked" type="checkbox" /><span>弁々</span></label></li>
            <li><label><input class="char" value="128" checked="checked" type="checkbox" /><span>八橋</span></label></li>
            <li><label><input class="char" value="129" checked="checked" type="checkbox" /><span>正邪</span></label></li>
            <li><label><input class="char" value="130" checked="checked" type="checkbox" /><span>針妙丸</span></label></li>
            <li><label><input class="char" value="131" checked="checked" type="checkbox" /><span>雷鼓</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="j" checked="checked" type="checkbox" /><span>東方紺珠伝</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="028" checked="checked" type="checkbox" /><span>うどんげ</span></label></li>
            <li class="last-player"><label><input class="char" value="050" checked="checked" type="checkbox" /><span>早苗</span></label></li>
            <li><label><input class="char" value="132" checked="checked" type="checkbox" /><span>清蘭</span></label></li>
            <li><label><input class="char" value="133" checked="checked" type="checkbox" /><span>鈴瑚</span></label></li>
            <li><label><input class="char" value="134" checked="checked" type="checkbox" /><span>ドレミー</span></label></li>
            <li><label><input class="char" value="135" checked="checked" type="checkbox" /><span>サグメ</span></label></li>
            <li><label><input class="char" value="136" checked="checked" type="checkbox" /><span>クラウンピース</span></label></li>
            <li><label><input class="char" value="137" checked="checked" type="checkbox" /><span>純狐</span></label></li>
            <li><label><input class="char" value="138" checked="checked" type="checkbox" /><span>ヘカーティア</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label><input class="group-inner" name="k" checked="checked" type="checkbox" /><span>東方天空璋</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="005" checked="checked" type="checkbox" /><span>チルノ</span></label></li>
            <li><label><input class="char" value="035" checked="checked" type="checkbox" /><span>文</span></label></li>
            <li class="last-player"><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="143" checked="checked" type="checkbox" /><span>ラルバ</span></label></li>
            <li><label><input class="char" value="144" checked="checked" type="checkbox" /><span>ネムノ</span></label></li>
            <li><label><input class="char" value="015" checked="checked" type="checkbox" /><span>リリー</span></label></li>
            <li><label><input class="char" value="145" checked="checked" type="checkbox" /><span>あうん</span></label></li>
            <li><label><input class="char" value="146" checked="checked" type="checkbox" /><span>成美</span></label></li>
            <li><label><input class="char" value="147" checked="checked" type="checkbox" /><span>舞</span></label></li>
            <li><label><input class="char" value="148" checked="checked" type="checkbox" /><span>里乃</span></label></li>
            <li><label><input class="char" value="149" checked="checked" type="checkbox" /><span>隠岐奈</span></label></li>
          </ul>
          </fieldset>
        </li>
      </ul>
      </fieldset>

      <fieldset class="extra-titles">
      <legend>
        <label><input class="group-outer" type="checkbox" /><span>外伝/旧作</span></label>
      </legend>
      
      <ul class="titles">
        <li>
          <fieldset>
          <legend>
            <label title="東方萃夢想、東方緋想天、東方非想天則、東方心綺楼、東方深秘録、東方憑依華"><input class="group-inner" name="A" checked="checked" type="checkbox" /><span>黄昏系</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="005" checked="checked" type="checkbox" /><span>チルノ</span></label></li>
            <li><label><input class="char" value="006" checked="checked" type="checkbox" /><span>美鈴</span></label></li>
            <li><label><input class="char" value="008" checked="checked" type="checkbox" /><span>パチュリー</span></label></li>
            <li><label><input class="char" value="009" checked="checked" type="checkbox" /><span>咲夜</span></label></li>
            <li><label><input class="char" value="010" checked="checked" type="checkbox" /><span>レミリア</span></label></li>
            <li><label><input class="char" value="014" checked="checked" type="checkbox" /><span>アリス</span></label></li>
            <li><label><input class="char" value="120" checked="checked" type="checkbox" /><span>アリスの人形</span></label></li>
            <li><label><input class="char" value="019" checked="checked" type="checkbox" /><span>妖夢</span></label></li>
            <li><label><input class="char" value="020" checked="checked" type="checkbox" /><span>幽々子</span></label></li>
            <li><label><input class="char" value="022" checked="checked" type="checkbox" /><span>紫</span></label></li>
            <li><label><input class="char" value="023" checked="checked" type="checkbox" /><span>萃香</span></label></li>
            <li><label><input class="char" value="028" checked="checked" type="checkbox" /><span>うどんげ</span></label></li>
            <li><label><input class="char" value="031" checked="checked" type="checkbox" /><span>妹紅</span></label></li>
            <li><label><input class="char" value="035" checked="checked" type="checkbox" /><span>文</span></label></li>
            <li><label><input class="char" value="038" checked="checked" type="checkbox" /><span>小町</span></label></li>
            <li><label><input class="char" value="048" checked="checked" type="checkbox" /><span>にとり</span></label></li>
            <li><label><input class="char" value="050" checked="checked" type="checkbox" /><span>早苗</span></label></li>
            <li><label><input class="char" value="052" checked="checked" type="checkbox" /><span>諏訪子</span></label></li>
            <li><label><input class="char" value="059" checked="checked" type="checkbox" /><span>お空</span></label></li>
            <li><label><input class="char" value="060" checked="checked" type="checkbox" /><span>こいし</span></label></li>
            <li><label><input class="char" value="061" checked="checked" type="checkbox" /><span>衣玖</span></label></li>
            <li><label><input class="char" value="062" checked="checked" type="checkbox" /><span>天子</span></label></li>
            <li><label><input class="char" value="065" checked="checked" type="checkbox" /><span>一輪</span></label></li>
            <li><label><input class="char" value="068" checked="checked" type="checkbox" /><span>白蓮</span></label></li>
            <li><label><input class="char" value="074" checked="checked" type="checkbox" /><span>布都</span></label></li>
            <li><label><input class="char" value="075" checked="checked" type="checkbox" /><span>神子</span></label></li>
            <li><label><input class="char" value="076" checked="checked" type="checkbox" /><span>マミゾウ</span></label></li>
            <li><label><input class="char" value="078" checked="checked" type="checkbox" /><span>華扇</span></label></li>
            <li><label><input class="char" value="122" checked="checked" type="checkbox" /><span>こころ</span></label></li>
            <li><label><input class="char" value="123" checked="checked" type="checkbox" /><span>菫子</span></label></li>
            <li><label><input class="char" value="150" checked="checked" type="checkbox" /><span>紫苑</span></label></li>
            <li><label><input class="char" value="151" checked="checked" type="checkbox" /><span>女苑</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label title="文花帖、ダブルスポイラー、妖精大戦争、弾幕アマノジャク、秘封ナイトメアダイアリー"><input class="group-inner" name="B" checked="checked" type="checkbox" /><span>STG系</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="035" checked="checked" type="checkbox" /><span>文</span></label></li>
            <li><label><input class="char" value="077" checked="checked" type="checkbox" /><span>はたて</span></label></li>
            <li><label><input class="char" value="129" checked="checked" type="checkbox" /><span>正邪</span></label></li>
            <li><label><input class="char" value="005" checked="checked" type="checkbox" /><span>チルノ</span></label></li>
            <li><label><input class="char" value="123" checked="checked" type="checkbox" /><span>菫子</span></label></li>
            <li><label><input class="char" value="004" checked="checked" type="checkbox" /><span>大妖精</span></label></li>
            <li><label><input class="char" value="015" checked="checked" type="checkbox" /><span>リリー</span></label></li>
            <li><label><input class="char" value="040" checked="checked" type="checkbox" /><span>サニー</span></label></li>
            <li><label><input class="char" value="041" checked="checked" type="checkbox" /><span>スター</span></label></li>
            <li><label><input class="char" value="042" checked="checked" type="checkbox" /><span>ルナ</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label title="東方三月精、東方儚月抄、東方茨歌仙、東方鈴奈庵、東方香霖堂、東方求聞口授、東方求聞史紀、グリモワールオブマリサ"><input class="group-inner" name="D" checked="checked" type="checkbox" /><span>書籍系</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" checked="checked" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" checked="checked" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="032" checked="checked" type="checkbox" /><span>レイセン</span></label></li>
            <li><label><input class="char" value="033" checked="checked" type="checkbox" /><span>依姫</span></label></li>
            <li><label><input class="char" value="034" checked="checked" type="checkbox" /><span>豊姫</span></label></li>
            <li><label><input class="char" value="040" checked="checked" type="checkbox" /><span>サニー</span></label></li>
            <li><label><input class="char" value="041" checked="checked" type="checkbox" /><span>スター</span></label></li>
            <li><label><input class="char" value="042" checked="checked" type="checkbox" /><span>ルナ</span></label></li>
            <li><label><input class="char" value="136" checked="checked" type="checkbox" /><span>クラウンピース</span></label></li>
            <li><label><input class="char" value="043" checked="checked" type="checkbox" /><span>阿求</span></label></li>
            <li><label><input class="char" value="044" checked="checked" type="checkbox" /><span>霖之助</span></label></li>
            <li><label><input class="char" value="078" checked="checked" type="checkbox" /><span>華扇</span></label></li>
            <li><label><input class="char" value="119" checked="checked" type="checkbox" /><span>朱鷺子</span></label></li>
            <li><label><input class="char" value="121" checked="checked" type="checkbox" /><span>小鈴</span></label></li>
            <li><label><input class="char" value="139" checked="checked" type="checkbox" /><span>易者</span></label></li>
            <li><label><input class="char" value="153" checked="checked" type="checkbox" /><span>蟒蛇</span></label></li>
            </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label title="サウンドトラック、秘封倶楽部"><input class="group-inner" name="E" checked="checked" type="checkbox" /><span>音楽CD系</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="043" checked="checked" type="checkbox" /><span>阿求</span></label></li>
            <li><label><input class="char" value="079" checked="checked" type="checkbox" /><span>メリー</span></label></li>
            <li><label><input class="char" value="080" checked="checked" type="checkbox" /><span>蓮子</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend>
            <label title="名前しかないキャラ"><input class="group-inner" name="E" type="checkbox" /><span>設定だけ</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="113" type="checkbox" /><span>レイラ</span></label></li>
            <li><label><input class="char" value="116" type="checkbox" /><span>妖忌</span></label></li>
          </ul>
          </fieldset>
        </li>
        <li>
          <fieldset>
          <legend style="color:blue;">
            <label title="東方靈異伝、東方封魔録、東方夢時空、東方幻想郷、東方怪綺談"><input class="group-inner" name="F" type="checkbox" /><span>東方旧作系</span></label>
          </legend>
          <ul class="group-chars" style="display: none;">
            <li><label><input class="char" value="001" alt="140" type="checkbox" /><span>霊夢</span></label></li>
            <li><label><input class="char" value="002" alt="141" type="checkbox" /><span>魔理沙</span></label></li>
            <li><label><input class="char" value="014" alt="142" type="checkbox" /><span>アリス</span></label></li>
            <li><label><input class="char" value="037" type="checkbox" /><span>幽香</span></label></li>
            <li class="last-player"><label><input class="char" value="083" type="checkbox" /><span>魅魔</span></label></li>
            <li><label><input class="char" value="086" type="checkbox" /><span>神玉</span></label></li>
            <li><label><input class="char" value="087" type="checkbox" /><span>幽幻魔眼</span></label></li>
            <li><label><input class="char" value="088" type="checkbox" /><span>エリス</span></label></li>
            <li><label><input class="char" value="089" type="checkbox" /><span>サリエル</span></label></li>
            <li><label><input class="char" value="090" type="checkbox" /><span>キクリ</span></label></li>
            <li><label><input class="char" value="091" type="checkbox" /><span>コンガラ</span></label></li>
            <li><label><input class="char" value="092" type="checkbox" /><span>里香</span></label></li>
            <li><label><input class="char" value="093" type="checkbox" /><span>明羅</span></label></li>
            <li><label><input class="char" value="094" type="checkbox" /><span>エレン</span></label></li>
            <li><label><input class="char" value="095" type="checkbox" /><span>小兎姫</span></label></li>
            <li><label><input class="char" value="096" type="checkbox" /><span>カナ</span></label></li>
            <li><label><input class="char" value="097" type="checkbox" /><span>理香子</span></label></li>
            <li><label><input class="char" value="098" type="checkbox" /><span>ちゆり</span></label></li>
            <li><label><input class="char" value="099" type="checkbox" /><span>岡崎夢美</span></label></li>
            <li><label><input class="char" value="152" type="checkbox" /><span>る～こと</span></label></li>
            <li><label><input class="char" value="100" type="checkbox" /><span>オレンジ</span></label></li>
            <li><label><input class="char" value="101" type="checkbox" /><span>くるみ</span></label></li>
            <li><label><input class="char" value="102" type="checkbox" /><span>エリー</span></label></li>
            <li><label><input class="char" value="103" type="checkbox" /><span>夢月</span></label></li>
            <li><label><input class="char" value="104" type="checkbox" /><span>幻月</span></label></li>
            <li><label><input class="char" value="105" type="checkbox" /><span>サラ</span></label></li>
            <li><label><input class="char" value="106" type="checkbox" /><span>ルイズ</span></label></li>
            <li><label><input class="char" value="107" type="checkbox" /><span>ユキ</span></label></li>
            <li><label><input class="char" value="108" type="checkbox" /><span>マイ</span></label></li>
            <li><label><input class="char" value="109" type="checkbox" /><span>夢子</span></label></li>
            <li><label><input class="char" value="110" type="checkbox" /><span>神綺</span></label></li>
            <li><label><input class="char" value="111" type="checkbox" /><span>玄爺</span></label></li>
            <li><label><input class="char" value="117" type="checkbox" /><span>魔天使</span></label></li>
            <li><label><input class="char" value="118" type="checkbox" /><span>呪い子</span></label></li>
          </ul>
          </fieldset>
        </li>
      </ul>
      </fieldset>
      
      <fieldset id="option">
        <legend>オプション</legend>
        <ul>
          <li><label>ランキング件数
            <select id="rank_num">
              <option value="10" selected="selected">10位まで</option>
              <option value="1">1位だけ</option>
              <option value="5">5位まで</option>
              <option value="7">7位まで (東方 Wiki 人気投票用)</option>
              <option value="20">20位まで</option>
              <option value="30">30位まで</option>
              <option value="50">50位まで</option>
              <option value="100">100位まで</option>
              <option value="999">全て</option>
            </select>
          </label></li>
          <li><label><input id="enableOldVersionStyle" value="1" name="enableOldVersionStyle" type="checkbox" />旧作と Win 版の同名キャラを区別する(幽香除く)</label></li>
          <li>イラストのタイプ
            <ul class="illust-type">
              <li><label><input value="1" name="facePattern" type="radio" checked="checked" />スマイル</label></li>
              <li><label><input value="2" name="facePattern" type="radio" />ノーマル</label></li>
              <li><label><input value="99" name="facePattern" type="radio" />画像なし</label></li>
            </ul>
          </li>
          <!--li><label class="unchecked"><input name="none_name" checked="checked" type="checkbox" /><span>無名キャラ<br />を含める</span></label></li-->
        </ul>
      </fieldset>
      <div class="clear"><button id="start_button">ソート開始！</button></div>
      </div>
    </div>
    <div style="" id="ui">
      <h2>こっちだと思う方を選択</h2>
      <h3 class="count">第 {{ questionCount }} 問</h3>
      <p id="caption" style="display: none;"></p>

      <div class="zitem" id="left" @click.stop="button_click(0, 1)">
        <div>
          <img height="290" width="200" src="./char/f2/c046.png" alt="秋穣子" style="width: 200px; height: 300px; top: 0px; left: 0px;" />
        </div>
        <div class="caption" style="display: none;">
          <h3 class="nick">豊かさと稔りの象徴</h3>
          <p class="name">秋穣子</p>
        </div>
      </div>
      <div class="zitem" id="right" @click.stop="button_click(1, 0)">
        <div>
          <img width="200" height="300" src="./char/f2/c002.png" alt="霧雨魔理沙" style="width: 200px; height: 300px; top: 0px; left: 0px;" />
        </div>
        <div class="caption" style="display: none;">
          <h3 class="nick">普通の魔法使い</h3>
          <p class="name">霧雨魔理沙</p>
        </div>
      </div>
      <div class="special_select">
        <button onclick="remove_left()">左侧角色将从排序中删除</button>
        <button onclick="remove_right()">右侧角色将从排序中删除</button><br />
        <button id="hold" onclick="ask_hold()" style="visibility: visible;">あとで (パスする)</button>
        <button id="back" onclick="ask_back()" style="visibility: hidden;">待った（1つ前の質問に戻る）</button><br />
        <button onclick="return (confirm('本当に？') &amp;&amp; auto_sort());">残り全てをランダムに選ぶ</button>
        
        <!-- button onclick="return (toggle_current());">デバッグ</button -->
      </div>
    </div>

    <div style="display: none;" id="result">
    </div>

    <p id="times"></p>
    <div style="" id="reset">
      <button id="reset_button">ソートに戻る</button>
    </div>

    <div id="attension">
      <p>このソートは、一対比較法によるヒープソートを利用して作られています。<br />
      選択肢の順序により、結果にはブレが発生する可能性があります（順序効果）。</p>
    </div>
    <address>
      改変要望はこちらまで：<a href="https://twitter.com/aoi_tylight">@aoi_tylight</a> (<a href="http://readalittle.net/">read a little.</a>)
      <br />オリジナルスクリプト：<a href="http://totora.jpn.org/">ねこトトラ</a>
      <br />イラスト：<a href="http://gensoukyou.1000.tv/">幻想幽玄庵</a>, <a href="http://www.pixiv.net/member.php?id=4920496">dairi(pixiv)</a>
      <br />このスクリプトの利用・改造・転載等は<strong>画像を除いて</strong>自由です。
      <br />東方 Project 及びキャラクターは上海アリス幻樂団の著作物です。
      <br />MF とは Minor Fix の事です。
    </address>
    <div id="goog-gt-tt" class="skiptranslate" dir="ltr"><div style="padding: 8px;"><div><div class="logo"><img src="https://www.gstatic.com/images/branding/product/1x/translate_24dp.png" width="20" height="20" alt="Google 翻译" /></div></div></div><div class="top" style="padding: 8px; float: left; width: 100%;"><h1 class="title gray">原文</h1></div><div class="middle" style="padding: 8px;"><div class="original-text"></div></div><div class="bottom" style="padding: 8px;"><div class="activity-links"><SPAN class="activity-link">提供更好的翻译建议</SPAN><SPAN class="activity-link"></SPAN></div><div class="started-activity-container"><hr style="color: #CCC; background-color: #CCC; height: 1px; border: none;" /><div class="activity-root"></div></div></div><div class="status-message" style="display: none;"></div></div>

    <div class="goog-te-spinner-pos"><div class="goog-te-spinner-animation"><svg xmlns="http://www.w3.org/2000/svg" class="goog-te-spinner" width="96px" height="96px" viewBox="0 0 66 66"><circle class="goog-te-spinner-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"/></svg></div></div></body>
  </div>
</template>

<script>
export default {
  data: {
    questionCount: 0,
    questionBackup: null,
  },

  methods: {
    button_click(win, lose) {
      backup();
      // 敗者と同着ツリー最上位の上に、勝者を追加する
      var winner = Question[win];
      var loser = Question[lose];
      winner.add(loser, false);

      if (this.ask_next() == false) {
        show_result();
      }
    },

    backup() {
      // 保存到ID树
      questionBackup = [Question[0].id, Question[1].id];
      BackupTree.setupCTree();
      BackupTree.initTree(SortTree, BackupTree);
    },

    ask_start() {
      this.questionBackup = null;
      this.questionCount = 0;
      initRankNum();
      SortTree = new SortObject(["!root", , , , ]);
      initOldVersionStyle();
      FacePattern = $("[name='facePattern']:checked").val();
      // 選択キャラ構築（ユニーク）
      selectedChars = [];
      $(":checkbox.char").each(function(index) {
        var v = $(this).attr("value");
        if ($(this).is(":checked") && $.inArray(v, selectedChars) === -1) {
          selectedChars.push(v);
        }
      });
      // そんな設定で大丈夫か？
      if( selectedChars.length >= 400){
        if( confirm("ソートする対象が " + selectedChars.length + " 件あります。\n設問数が非常に多くなる事が想定されますが、覚悟はよろしいですか？") === false ){
          return false;
        }
      }
      if (selectedChars.length <= 1) {
        alert("ソートするものがありません。");
        return false;
      }
      for (var i = 0; i < ResourceData.length; i++) {
        var resourceId = ResourceData[i][0];
        // ID で属性値検索してヒットしたらそのキャラは対象とする
        if ($.inArray(resourceId, selectedChars) > -1) {
          SortTree.add(new SortObject(ResourceData[i]), false);
        }
      }
      $("div.caption").show();
      TimeStarted = new Date();
      this.ask_next();
      // 復元準備
      BackupTree = new IDSortTree();
      BackupTree.setupCTree();
      BackupTree.initTree(SortTree, BackupTree);
      $("#init").hide(0);
      $("#ui").fadeIn(1000);
      $("#reset").show();
    },

    ask_next(isBacked) {
      this.questionCount++;
      hide_question();
      $("#count").text(this.questionCount);
      $("#hold").css("visibility", "visible");
      $("#back").css("visibility", "visible");
      // 第1問は戻れないので消しとく
      if (this.questionCount == 1) {
        $("#back").css("visibility", "hidden");
      }
      // 如果是“等待”，请恢复问题
      if (isBacked === true) {
        $("#back").css("visibility", "hidden");
        Question = SortTree.ask(Question);
      } else {
        Question = SortTree.ask();
      }
      if (Question) {
        if (Question[1].level() > RankNum) {
          return false;
        }
        show_question();
        return true;
      }
      return false;
    },
  }
}

fadeInTime = 200;
fadeOutTime = 0;
RankNum = 0;
noFacePatternNo = 99;
FacePattern = 0;
FacePatternDefault = 1;
BackupTree = null;
EvenList = [];
ElapsedTime = 0;
TimeStarted = null;
isFirstRemoveChoice = true;
// 初期化
$(document).ready(function() {
	$("#caption").hide();
	$("#result").hide();
	$("#ui").hide();
	$("#reset").hide();
	$("#samp").toggle();
	$("#sampback").toggle();
	$("#start_button").bind("click", ask_start);
	$("#reset_button").bind("click", reset_do);
	if (show_result_from_hash()) {
		$("#init").hide();
		$("#reset").show();
	}
	loadImage();
});

/**
* 预加载资源数据的图像。
*/
function loadImage(){
	var kPatterns = [1, 2, 99];
	for( var i = ResourceData.length -1; i>=0; i-- ){
		var obj = new SortObject(ResourceData[i]);
		for( var j in kPatterns ){
			FacePattern = j;
			var path = new Image(obj.getImagePath());
		}
		delete obj;
	}
}

function restore() {
	// 从ID树还原
	Question = [questionBackup[0], questionBackup[1]];
	questionBackup = null;
	// 確定順位表示を一旦消す
	$("#caption").hide();
	SortTree = BackupTree.restoreCTree(BackupTree, null);
}

function initRankNum() {
	if (!RankNum) {
		if (location.search.length < 2) {
			var numObj = $("#rank_num option:selected");
			var numLen = parseInt(numObj.val());
			RankNum = numLen;
		} else {
			RankNum = location.search.slice(1).split("-").length;
		}
	}
}
// 检查是否添加并显示结果信息
function show_result_from_hash() {
	if (location.search.length < 2) {
		return false;
	}
	var strParams = location.search.slice(1).split("-");
	questionCount = 0;
	FacePattern = 0;
	initRankNum();
	
	if( !RankNum ){
		// 非対応ブラウザ。古いスマートフォン？
		alert("動作非対応ブラウザをお使いのようです。オプション指定無しのまま実行します。");
		RankNum = 10;
		FacePattern = FacePatternDefault;
	}
	// 経過秒数が付いている場合、付与（cs ver1.16.0～）
	var lastQuery = strParams[strParams.length - 1];
	if (lastQuery.charAt(0) == "t") { // face
		strParams.pop();
		lastQuery = lastQuery.slice(1, lastQuery.length);
		if (isNaN(lastQuery) == false) {
			ElapsedTime = parseInt(lastQuery);
		}
	}
	
	// フェースパターン指定が付いている場合、付与（cs ver1.8.0～）
	lastQuery = strParams[strParams.length - 1];
	if (lastQuery.charAt(0) == "f") { // face
		strParams.pop();
		lastQuery = lastQuery.slice(1, lastQuery.length);
		if (isNaN(lastQuery) == false) {
			FacePattern = parseInt(lastQuery);
		}
	}
	// 質問数が付いている場合、付与（cs ver1.7.0～）
	lastQuery = strParams[strParams.length - 1];
	if (lastQuery.charAt(0) == "q") { // question
		strParams.pop();
		lastQuery = lastQuery.slice(1, lastQuery.length);
		if (isNaN(lastQuery) == false) {
			questionCount = parseInt(lastQuery) + 1;
		}
	}
	SortTree = new SortObject(["!root", , , , ]);
	var objPal = SortTree;
	for (var i = 0; i < strParams.length; i++) {
		var isEven = (strParams[i].charAt(0) == "!");
		if(isEven){
			strParams[i] = strParams[i].substr(1, strParams[i].length - 1);
		}
		for (var j = 0; j < ResourceData.length; j++) {
			if (strParams[i] == ResourceData[j][0]) {
				var objChil = new SortObject(ResourceData[j]);
				objChil.isEven = isEven;
				objPal.add(objChil, false);
				objPal = objChil;
				// thanks @ide_an
				break;
			}
		}
	}
	show_result();
	return true;
}
// 旧作とWin版の同名キャラを区別:幽香除く alt属性値でvalueを置き換える
function initOldVersionStyle() {
	if ($("#enableOldVersionStyle").is(":checked")) {
		$(":checkbox[alt].char").each(function(index) {
			var v = $(this).attr("alt");
			$(this).val(v);
		});
	}
}
// 待った！
function ask_back() {
	// 復元して問い合わせ直す
	restore();
	questionCount -= 2;
	return ask_next(true);
}
// あとで
function ask_hold() {
	// ここで元々設問数をカウントアップしていたが、よくよく考えたら後の選択で増えるのでやめた
	// questionCount++;
	backup();
	var currentQ = [Question[0].id, Question[1].id];
	var isHoldedBefore = false;
	// 前に同じ組み合わせでパスした事がある場合引き分けを確認する (同IDは居ないので単純な組み合わせ比較)
	var len = EvenList.length;
	for( var i = 0; i < len; i++ ){
		if(EvenList[i][0] === currentQ[0] || EvenList[i][1] === currentQ[0]){
			if(EvenList[i][1] === currentQ[1] || EvenList[i][1] === currentQ[1]){
				if( confirm("前にもパスした選択です。\n引き分けにしますか？") ){
					return select_even();
				} else {
					isHoldedBefore = true;
					break;
				}
			}
		}
	}
	// 前にも同じ選択肢でパスしていなければ記録
	if( isHoldedBefore === false ){
		EvenList.push(currentQ);
	}

	// 前と違う質問を探す（もうパスできない時を考慮し、ある程度回数を制限する）
	var limit = 20;
	var isChange = false;
	for (var i = 1; i <= limit; i++) {
		if (currentQ && Question) {
			// 強制パス指定でask
			Question = SortTree.ask("PASS");
			if ($.inArray(Question[0].id, currentQ) == -1 || $.inArray(Question[1].id, currentQ) == -1) {
				hide_question();
				isChange = true;
				break;
			}
		}
	}
	if (isChange == false) {
		if( confirm("パスできません。\n引き分けにしますか？") ){
			var up = null;
			var down = null;
			if(Question[0].id < Question[1].id){
				up = Question[0];
				down = Question[1];
			} else {
				up = Question[1];
				down = Question[0];
			}
			down.isEven = true;
			up.add(down, true);
		}
	}
	if (ask_next() == false) {
		show_result();
		return false;
	}
	$("#count").text(questionCount);
	$("#hold").css("visibility", "visible");
	$("#back").css("visibility", "visible");
	if (Question) {
		if (Question[1].level() > RankNum) {
			return false;
		}
		show_question();
		return true;
	}
	return false;
}

function view_character(id, data) {
	$(id + " img").attr("src", data.getImagePath());
	$(id + " img").attr("alt", data.name);
	$(id + " p").text(data.name);
	$(id + " h3").text(data.nick);
}

function hide_question() {
	$("#left").fadeOut(fadeOutTime);
	$("#right").fadeOut(fadeOutTime);
}

function show_question() {
	view_character("#left", Question[0]);
	view_character("#right", Question[1]);
	$("#left").fadeIn(fadeInTime);
	$("#right").fadeIn(fadeInTime);
}

function view_progress() {}

// 選択
function button_click(arg) {
	$("#left").fadeOut(fadeOutTime);
	$("#right").fadeOut(fadeOutTime);
	backup();
	// 敗者と同着ツリー最上位の上に、勝者を追加する
	var winner = Question[arg.data.win];
	var loser = Question[arg.data.lose];
	winner.add(loser, false);

	if (ask_next() == false) {
		show_result();
	}
}

// 引き分け
function select_even() {
	$("#left").fadeOut(fadeOutTime);
	$("#right").fadeOut(fadeOutTime);
	backup();
	Question[1].isEven = true;
	Question[0].add(Question[1], true);
	if (ask_next() == false) {
		show_result();
	}
}

function toggle_current() {
	$("#samp").toggle();
	$("#samp").html(SortTree.toString());
	return false;
}

// どっちも除外
function remove_both() {
	Question[0].remove();
	Question[1].remove();
	if (ask_next() == false) {
		show_result();
	}
}

// 左は除外
function remove_left() {
	if(isFirstRemoveChoice){
		alert("注意：「ソートから外す」を選択すると、\n結果にも表示されなくなります。\nなるべく枠内を選択してくださいね。");
		isFirstRemoveChoice = false;
	}
	backup();
	Question[0].remove();
	if (ask_next() == false) {
		show_result();
	}
}

// 右は除外
function remove_right() {
	if(isFirstRemoveChoice){
		alert("注意：「ソートから外す」を選択すると、\n結果にも表示されなくなります。\nなるべく枠内を選択してくださいね。");
		isFirstRemoveChoice = false;
	}
	backup();
	Question[1].remove();
	if (ask_next() == false) {
		show_result();
	}
}

/**
* ランダム自動ソート用自動選択処理。タイマーをかけて使う。
*/
function realtimeSelect(){
	if( ask_next() ){
		Question[0].add(Question[1], false);
		return true;
	} else {
		clearInterval(GIntervalTimer);
		show_result();
		return false;
	}
};

/**
* ランダム自動ソート
*/
function auto_sort() {
	$(".special_select").hide();
	fadeInTime = 0;
	// グローバルスコープでタイマーをセット
	GIntervalTimer = setInterval(realtimeSelect, 50);
	
	return false;
}

function reset_do() {
	$("#init").removeAttr("style");
	$("#ui").hide();
	$("#result").hide();
	$("#reset").hide();
	$("#hold").css("visibility", "visible");
	$("#back").css("visibility", "visible");
	Question = null;
	questionBackup = null;
	SortTree = null;
	document.location = location.pathname;
}
// 結果表示
function show_result() {
	// 結果が出た時点でインクリメント済みなので1つ戻す
	--questionCount;
	// 経過時間の確認
	var timeElapsed = 0;
	var timeElapsedMinutes = 0;
	if( !ElapsedTime && TimeStarted ){
		timeElapsed = Math.floor((new Date().getTime() - TimeStarted.getTime()) / 1000);
		timeElapsedMinutes = Math.floor((timeElapsed / 60));
		ElapsedTime = timeElapsed;
		console.log("経過時間: " + timeElapsed + " 秒( " + timeElapsedMinutes +" 分)");
	} else if (ElapsedTime){
		timeElapsed = ElapsedTime;
		timeElapsedMinutes = Math.floor((timeElapsed / 60));
	}
	
	$("#ui").hide();
	$("#result").html("");
	var aryRanks = [];
	// ツリーを全て辿って一次元配列化（SortTreeメソッド化要検討）
	var objCur = SortTree.children[0];
	while(aryRanks.length < RankNum) {
		aryRanks.push(objCur);
		if (objCur.children.length >= 1) {
			objCur = objCur.children[0];
		} else {
			break;
		}
	}
	
	var strHtm = "";
	var strResults = [];
	var tweetResult = [];
	var simpleResult = [];
	simpleResult.push('<button id="viewSimpleResult">結果のテキスト版を表示</button><ul class="simpleResult">');
	tweetResult.push(encodeURIComponent("東方キャラソート結果！\n"));
	strHtm += '\n<h2>ソート結果発表！';
	if (questionCount > 0) {
		strHtm += '<span id="times">(第 ' + questionCount + ' 問で終了)</span>';
	}
	if( timeElapsed > 0 ){
		strHtm += '<span id="elapsed"> (' + timeElapsedMinutes + ' 分)</span>';
	}
	strHtm += '</h2>\n<ul class="rs_1st">\n';
	for (var i = 0; i < aryRanks.length; i++) {
		if (i == 2) {
			strHtm += '</ul>\n<ul class="rs_2nd">\n';
		}
		if (i == 6) {
			strHtm += '</ul>\n<ul class="rs_3rd">\n';
		}
		if (i >= 10 && i % 10 == 0) {
			strHtm += '</ul>\n<ul class="rs_4th">\n';
		}
		var rankNo = aryRanks[i].rank();
		strHtm += '<li><h3>' + rankNo + '</h3>';
		if (FacePattern == noFacePatternNo) {
			strHtm += aryRanks[i].name + '</li>\n';
		} else {
			strHtm += '<img src="' + aryRanks[i].getImagePath() + '" alt="' + aryRanks[i].nick + '" /><br />' + aryRanks[i].name + '</li>\n';
		}
		// 引き分けている場合は先頭に識別子を付加
		strResults.push((aryRanks[i].isEven ? "!" : "") + aryRanks[i].id);
		
		var recordText = rankNo + "位：" + aryRanks[i].name;
		if (i < 7) {
			tweetResult.push(encodeURIComponent(recordText + "\n"));
		}
		simpleResult.push("<li>" + recordText + "</li>");
	}
	tweetResult.push(encodeURIComponent("全" + aryRanks.length + "位を見る→ "));
	simpleResult.push("</ul>");
	strHtm += "</ul>\n";
	var siteQuery = strResults.join("-") + '-q' + questionCount + '-f' + FacePattern + '-t'  + ElapsedTime;
	if (location.search.length < 2) {
		strHtm += '<div class="special_select"><br />';
		strHtm += '[<a target="_blank" href="https://twitter.com/intent/tweet?url=' + location.href + '?' + siteQuery + '&amp;text=' +
			tweetResult.join("") + '">ソート結果をツイート</a>]<br />';
		strHtm += '[<a href="?' + siteQuery + '">このソート結果の URL</a>] (Twitter 以外のサイトに貼り付ける場合はこちら)<br />';
		strHtm += '</div>';
	}
	strHtm += simpleResult.join("\n");
	$("#result").html(strHtm);
	$("#result").fadeIn(1000);
	
	$(".simpleResult").slideToggle();
	$("#viewSimpleResult").click(function(){
		$(".simpleResult").slideToggle();
	});
}

</script>

