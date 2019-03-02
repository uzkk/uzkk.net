---
thumbnail: 'http://www.uzkk.net/wp-content/uploads/2018/12/2-V-P1-825x510.jpg'
postedOn: '2018-12-31T19:34:05+00:00'
author: 神楽坂千秋
tags:
  - 同人游戏
  - 东方同人游戏
  - 东方Project
  - 东方
  - 东方同人
  - 同人游戏攻略
  - 伪英国绅士团
  - 东方迷宫2
---

# 《东方的迷宫2》boss行动机制（1.203版）（上）

		> **原****文发布于bilibili中国，原地址：[null|https://www.bilibili.com/read/cv1772275]****

****作者授权转载：[null|https://space.bilibili.com/17071013]**

> 从国外一个论坛搞到了一份关于敌人行动机制的文件，这里将其中boss和FOE的部分贴出来供大家参考～

> 之前我的专栏攻略和视频攻略里也有关于boss（和FOE）行动机制的部分，但是那主要是以经验所做的推测，现在应该以这个为准

> 由于原文是伪代码格式和英文的，所以我会做必要的注释（以#开头的一行字,紧跟在正文后面），主要是介绍技能-（感觉伪代码什么的应该很好懂吧，）-

> 建议配合怪物属性食用：

> [null|https://en.touhouwiki.net/wiki/Labyrinth_of_Touhou_2/Bestiary]

> 首先需要说明的是，敌人的技能是有模式的，每一种模式会给我方前排4人一个权重，按照权重来表达概率。例如：“Target A with L.1 Attack”意味着一个敌人按照A模式发动【普通攻击】这个单体技能（技能等级（L.=Level）：1级），此时我方在前排1、2、4号位上有人，那么敌人这个技能对我方前排4个位置的权重就为60，30，0，3。（3号位空，则权重为0）概率为：60/93，30/93，3/93。（93=60+30+0+3）

> 技能分为以下几类模式：

> Mode A: Favor Left-most Character

> This mode favors the left-most character. It gives scores as follows (going from the leftmost slot to the rightmost one): 60, 30, 10, 3.

> A模式：偏好靠左边的角色，从左到右给出如下的权重：60, 30, 10, 3.

> Mode B: Any Character

> All slots are given a score of 20 with this mode, giving everyone an equal chance of being

> targetted.

> B模式：无偏好，每人概率相等，权重：20, 20, 20, 20.

> Mode C: Favor Right-most Character

> This mode is somewhat the opposite of Mode A. It gives scores as follows (going from the

> leftmost slot to the rightmost one): 10, 20, 30, 40. As far as I can tell, this mode is not used but the code for it exists.

> C模式：偏好靠右边的角色，从左到右给出如下的权重：10, 20, 30, 40.（好在这类技能没有出现,不然玩家就要被坑惨了）

> Mode D: First Character Available

> No score is given to any character in this mode. Instead, the first targettable character

> starting from the left will be automatically selected.

> D模式：只偏好最左边的，不会选择其他.

> Mode E: Any Enemy

> This is used when targetting the enemy’s group. Each active enemy has a score of 20, giving any one enemy an equal chance of being targetted.

> E模式(对敌方使用,如buff类技能)：无偏好，对每个敌人都有20的权重.

> 另外，aoe(全体技能)和列攻击(攻击一列)的攻击目标和伤害计算不受上述技能模式的影响(因为一打打所有前排人)，不过技能的特效动画会受到影响（可以认为是从哪个角色开始aoe看起来会不一样）

> p.s.敌方对我方列攻击时，从有人的位置开始从左往右，攻击倍率要乘上100%、80%、60%、40%（简而言之，要想减轻列攻击的伤害，就要把脆皮往右放，并且前排尽量塞满人）

> 最后要注意的是，敌人每次行动都会按照伪代码从头到尾来执行，但是只执行一个带“Target”开头的语句（即，只发一个技能），且只执行一个选择支（用缩进来表示在一个选择支里），执行完就会自动跳过剩下的所有选择支而不会进行任何判断；以及，概率开头的语句也是一种选择支。

> 首先让我们从FOE开始～

> 原名：グレイトシープ

> 英文版名：Chrysomallos

> 身份：2F的FOE

---

> Once, If HP <= 75%: #只发动一次,若HP小于等于HP上限的75%(即HP小于等于75%)时

> Target A with L.1 Great Roar #按照模式A发动【大咆哮】（风属性全体直接攻击，模式无效）

> Once, If HP <= 30%:

> Target A with L.1 Great Roar

> Otherwise: #如果上述两个都不发动，那么就按照下面的概率发动技能

> 50%: Target A with L.1 Attack #即平A（普通攻击，物属性，单体）

> 50%: Target A with L.1 Row Attack #【列攻击】（物属性列攻击，模式无效）

> 原名：レッサーゴーレム

> 英文版名：Lesser Golem

> 身份：3F的FOE

---

> Target A with L.1 Attack

> 原名：ヤツメノオロチ

> 英文版名：Lamprey Serpent

> 身份：4F、5F的FOE

---

> Once, If HP <= 80%:

> Target D with L.1 Swallow #【丸呑み】冥属性单体直接攻击，无视防御，带即死

> Once, If HP <= 50%:

> Target D with L.1 Swallow

> Once, If HP <= 20%:

> Target D with L.1 Swallow

> If HP >= 50%:

> 40%: Target A with L.1 Bite #【噛り付く】冷属性单体直接攻击，自身少量回血

> 30%: Target A with L.1 Attack

> 15%: Target A with L.1 Bite

> 15%: Target A with L.1 Bite

> If HP <= 50%:

> 40%: Target A with L.1 Bite

> 20%: Target D with L.1 Bite

> 10%: Target A with L.1 Bite

> 15%: Target A with L.1 Bite

> 15%: Target A with L.1 Bite

> 英文版名：Siren of Silence

> 身份：5F的FOE

---

> On turn % 3 = 1:

> Target A with L.1 Silent Fog #行动次数每除3余1（第1、4、……次行动）就使用【沈黙の霧】全体灵属性魔法攻击，带沉默

> On turn % 6 = 2:

> Target A with L.1 Storm Of Purple Magic #【紫魔の嵐】魔属性全体魔法攻击

> On turn % 6 = 3:

> Target A with L.1 Magical Blast #【魔力の炸裂】魔属性全体魔法攻击，属性倍率低，伤害倍率高

> On turn % 6 = 5:

> Target A with L.1 Storm Of Blue Rain #【蒼雨の嵐】冷属性全体魔法攻击

> On turn % 6 = 0:

> Target B with L.1 Azure Arrow #【蒼の矢】冷属性单体魔法攻击

> #也就是说，这个FOE的技能是6个一循环：ABCADE；另外，“turn % 6=3”意味着turn是一个表示行动次数的变量，它除6余3（%为取余符号）

> 原名：星熊 勇儀

> 英文版名：Yuugi Hoshiguma

> 身份：6F的FOE

---

> If HP <= 50%:

> Target D with L.1 Knockout In Three Steps #【三歩必殺】物属性单体直接攻击

> If HP <= 80%:

> 33%: Target A with L.1 Attack

> 34%: Target A with L.1 Supernatural Phenomenon #【怪力乱神】然属性单体直接攻击

> 33%: Target A with L.1 Irremovable Shackles #【咎人の外さぬ枷】灵属性单体直接攻击，带麻 痹、沉默、钝重

> Otherwise:

> 75%: Target A with L.1 Attack

> 25%: Target A with L.1 Irremovable Shackles

> #可以看出上面非常清楚地把血量分为了三个阶段

> 原名：巨人樹

> 英文版名：Giant Tree

> 身份：7F的FOE

---

> 16%: Target A    with L. 1 Nut Throw #【ナッツ投げ】然属性单体直接攻击，带冲击

> 17%: Target A    with L. 1 Horizontal Slice #【なぎ払い】物属性全体直接攻击

> 17%: Target A    with L. 1 Leaf Cutting Dance #【木葉斬舞】然属性全体魔法攻击，计算双防之和

> 16%: Target A    with L. 1 Scale Powder #【鱗粉】然属性全体魔法攻击，带双防debuff

> 17%: Target A    with L. 1 Storm Of Wood Leaves (2) #【木葉の嵐】然属性全体魔法攻击

> 17%: Target Self with L.33 Healing Power #【治癒の力】灵属性自身技能，回血（约25000，回血量和双攻无关）

> p.s.这个boss每次行动都会使用一个不消耗行动条的技能给自己回血3040（同样地，回血量和双攻也无关），上面的伪代码里面忘了写

> 原名：紫紺の婀娜華

> 英文版名：Violet Ada-Bana

> 身份：8F的FOE

---

> 16%: Target A with L.1 Green Arrow #【碧の矢】然属性单体魔法攻击

> 17%: Target A with L.1 Storm Of Wood Leaves (2)

> 17%: Target A with L.4 Paralysis Spore #【麻痺胞子】风属性全体魔法攻击，带麻 痹

> 16%: Target A with L.1 Ancient Curse #【古の呪い】冥属性全体魔法攻击，带猛毒、麻 痹、钝重、冲击

> 17%: Target A with L.1 Wild Dance Of Freezing Mist #【霧氷乱舞】冷属性全体魔法攻击

> 17%: Target A with L.1 Flux Of Yomotsu Hirasaka #【黄泉比良坂流転】冥属性全体魔法攻击，带即死

> 原名：砂丘の古代兵器・金凱

> 英文版名：Desert Weapon – Gold Hymn

> 身份：10F的FOE

---

> On turn % 2 = 1:

> Target Self with L.1 Concentrate #【集中】，行动条变为1000

> On turn % 2 = 0:

> Target A with L.1 Flowing Hellfire #【業火炎流】火属性全体魔法攻击

> 原名：砂丘の古代兵器・銀鎧

> 英文版名：Desert Weapon – Silver Mail

> 身份：10F的FOE

---

> On turn % 2 = 1:

> Target Self with L.1 Concentrate

> On turn % 2 = 0:

> Target A with L.1 Wild Dance Of Freezing Mist

> 原名：炎獄の溶岩竜

> 英文版名：Burning Hell’s Lava Dragon

> 身份：15F的FOE

---

> 14%: Target A with L.1 Flamethrower #【火炎放射】火属性全体魔法攻击，计算双防之和

> 14%: Target A with L.1 Bite

> 14%: Target A with L.4 Lava Flow #【溶岩流】火属性全体直接攻击

> 14%: Target A with L.1 Slash Dive #【スラッシュダイブ】风属性单体直接攻击

> 14%: Target A with L.1 Great Roar

> 15%: Target A with L.1 Row Attack

> 15%: Target A with L.1 Daze #【衝撃攻撃】火属性单体直接攻击

> 原名：業魔の大啜蟲

> 英文版名：Demon Hell’s Slurping Worm

> 身份：16F的FOE

---

> On turn % 2 = 1:

> Target Self with L.12 Regeneration

> If HP < 40% and  8% chance: #当HP小于40%时有8%的几率发动下一行的技能

> Target A with L.1 World Devouring Destruction #【世界を蝕む破滅】冥属性全体技能，敌方所有人（含后排）血量强制为1

> If HP < 70% and 10% chance:

> Target A with L.1 Ether Flare #【エーテルフレア】魔属性全体魔法攻击

> Otherwise:

> 13%: Target B with L.1 Destroy Magic #【魔力消滅】魔属性单体魔法攻击，使被命中者MP归零

> 13%: Target A with L.1 Shadowstep #【影踏み】冥属性全体直接攻击，带麻 痹

> 13%: Target A with L.1 Leg Sweep #【足払い】然属性一列直接攻击，带冲击

> 13%: Target A with L.1 Half Moon Slash #【半月斬】魔属性全体攻击，伤害为0，使被命中者血量减半（向下取整）

> 12%: Target A with L.4 Swallow

> 12%: Target A with L.1 Storm Of Dark Flow #【暗闇の嵐】冥属性全体魔法攻击

> 12%: Target A with L.1 Devil’s Crimes #【蠱物の罪行】冥属性全体魔法攻击，带全属性debuff

> 12%: Target A with L.1 1000 Needles #【針千本】物属性全体直接攻击

> 原名：黒の魔術師

> 英文版名：Taur Magician

> 身份：17F的FOE

> ————————-

> 14%: Target A    with L. 1 Storm Of Dark Flow

> 14%: Target A    with L. 2 Terror Eater #【恐怖喰い】冥属性全体攻击，伤害为0，对带恐怖状态的即死（不可被抗性）

> 14%: Target B    with L. 1 Destroy Magic

> 14%: Target B    with L. 1 Dark Arrow #【闇の矢】冥属性单体魔法攻击

> 14%: Target A    with L.10 Silent Fog

> 14%: Target B    with L. 1 Black Universe #【黒の大虚】冥属性单体攻击，伤害为0，被命中者血量强制为1，带麻 痹、恐怖、速度debuff

> 8%: Target A    with L. 1 Magical Blast

> 8%: Target Self with L. 1 MAG UP

---

> 上面就是1.203版里所有的FOE了~

> 而下面我们将介绍各个boss~

---

> 原名：ワルナッツイーター

> 英文版名：Malignut Eater

> 身份：1F的boss，推荐等级3级

---

> On turn 1:

> Target A with L.1 Call Underling #【子分を呼ぶ】对本方使用，召唤几个ナッツイーター（Nut Eater，等级2级）填满场上空位（最多4个），使用完后行动条10000，马上接着行动

> After Call Underling: #也就是说每次召唤出来必定接着使用下一行的技能

> Target A with L.1 Umbrella Spin #【唐傘廻し】对本方使用，使得除了自己以外的所有对象行动条变为10000

> Otherwise:

> 40%: Target A with L.1 Attack

> 40%: Target A with L.1 Nut Throw

> 20%: Target A with L.1 Call Underling

> #也就是说，下一次召唤是随机的而且每次行动召唤概率相等

---

> 原名：ナッツイーター

> 英文版名：Nut Eater

---

> 70%: Target A with L.1 Attack

> 30%: Target A with L.1 Nut Throw

---

> 原名：魂魄 妖夢

> 英文版名：Youmu Konpaku

> 身份：1F的boss，推荐等级5级

---

> Once, If HP <= 80%:

> Target A with L.1 Slash Clearing the Six Senses #【六根清浄斬】然属性全体直接攻击

> Once, If HP <= 60%:

> Target Self with L.1 Concentrate

> Once, After HP <= 60% Concentrate:

> Target A with L.1 God’s Slash of Karma Wind #【業風神閃斬】风属性全体直接攻击

> Once, If HP <= 20%:

> Target Self with L.1 Concentrate

> Once, After HP <= 20% Concentrate:

> Target A with L.1 God’s Slash of Karma Wind

> If HP >= 60%:

> 50%: Target A with L.1 Attack

> 50%: Target A with L.1 Present Life Slash #【現世斬】物属性单体直接攻击

> Otherwise:

> 43%: Target A with L.1 Attack

> 43%: Target A with L.1 Present Life Slash

> 14%: Target A with L.1 Slash Clearing the Six Senses

---

> 原名：蓬莱山 輝夜

> 英文版名：Kaguya Houraisan

> 身份：2F的boss，推荐等级8级

---

> Once, If HP <= 80%:

> Target A with L.1 Dragon’s Neck Jewel #【龍の頸の玉 -五色の弾丸-】魔属性全体魔法攻击

> Once, If HP <= 60%:

> Target A with L.1 Buddha’s Stone Bowl #【仏の御石の鉢 -砕けぬ意志-】灵属性全体魔法攻击，带双防debuff，给使用者全属性buff

> Once, If HP <= 40%:

> Target A with L.1 Swallow’s Cowrie Shell #【燕の子安貝 -永命線-】然属性全体魔法攻击

> Once, If HP <= 24%

> Target Self with L.1 Concentrate

> After Concentrate:

> Target A with L.1 Bullet Branch of Hourai #【蓬莱の弾の枝 -虹色の弾幕-】灵属性全体魔法攻击

> If HP >= 81%:

> 25%: Target A with L.1 Spark Storm #【火粉の嵐】火属性全体魔法攻击

> 25%: Target A with L.1 Storm Of Blue Rain

> 25%: Target A with L.1 Storm Of Yellow Drive #【黄駆の嵐】风属性全体魔法攻击

> 25%: Target A with L.1 Storm Of Wood Leaves (2)

> If HP >= 61%:

> 18%: Target A with L.1 Spark Storm

> 18%: Target A with L.1 Storm Of Blue Rain

> 18%: Target A with L.1 Storm Of Yellow Drive

> 18%: Target A with L.1 Storm Of Wood Leaves (2)

> 18%: Target A with L.1 Dragon’s Neck Jewel

> If HP >= 41%:

> 30%: Target A with L.1 Dragon’s Neck Jewel

> 16%: Target A with L.1 Storm Of Yellow Drive

> 16%: Target A with L.1 Storm Of Blue Rain

> 16%: Target A with L.1 Spark Storm

> 12%: Target A with L.1 Storm Of Wood Leaves (2)

> 10%: Target A with L.1 Buddha’s Stone Bowl

> Otherwise:

> 28%: Target A with L.1 Dragon’s Neck Jewel

> 12%: Target A with L.1 Swallow’s Cowrie Shell

> 12%: Target A with L.1 Storm Of Yellow Drive

> 12%: Target A with L.1 Storm Of Wood Leaves (2)

> 12%: Target A with L.1 Storm Of Blue Rain

> 12%: Target A with L.1 Spark Storm

> 12%: Target A with L.1 Dragon’s Neck Jewel

---

> 原名：アリスの人形？

> 英文版名：Alice’s Doll?

> 身份：2F的boss，推荐等级8级

---

> Target A with L.1 Attack

---

> 原名：阿頼耶樹

> 英文版名：Alaya-Vijnana

> 身份：3F的boss，推荐等级32级（二周目有全人物时，推荐等级为14级）

---

> 20%: Target B with L.1 Storm Of Yellow Drive

> 20%: Target B with L.1 Storm Of Wood Leaves (2)

> 20%: Target B with L.1 Storm Of Purple Magic

> 40%: Target B with L.1 Horizontal Slice

---

> 原名：小野塚 小町

> 英文版名：Komachi Onozuka

> 身份：3F的boss，推荐等级12级

---

> Once, If HP <= 40%:

> Target B with L.1 Narrow Confines of Avici #【無間の狭間】灵属性全体魔法攻击，带麻 痹、恐怖、即死（概率中）、全属性debuff

> Once, If HP <= 25%:

> Target A with L.1 Scythe that Chooses the Dead #【死者選別の鎌】灵属性单体直接攻击，带即死（概率高）

> If HP >= 76%:

> 40%: Target D with L.1 Short Life Expectancy #【余命幾許も無し】物属性单体直接攻击，带即死（概率低）

> 20%: Target B with L.1 Phantoms Coldness #【幽霊の冷気】冷属性全体直接攻击

> 20%: Target A with L.1 Row Attack

> 20%: Target A with L.1 Attack

> If HP >= 34%:

> 45%: Target D with L.1 Short Life Expectancy

> 25%: Target B with L.1 Ferriage in the Deep Fog #【八重霧の渡し】冷属性全体直接攻击，带即死（概率中低）

> 10%: Target B with L.1 Phantoms Coldness

> 10%: Target A with L.1 Row Attack

> 10%: Target A with L.1 Attack

> If HP >= 16%:

> 45%: Target D    with L.1 Short Life Expectancy

> 15%: Target B    with L.1 Ferriage in the Deep Fog

> 10%: Target A    with L.1 Scythe that Chooses the Dead

> 10%: Target Self with L.1 Recover #【恢复】自身技能，恢复少量血量（700左右）

> 10%: Target A    with L.1 Row Attack

> 10%: Target B    with L.1 Phantoms Coldness

> Otherwise:

> 40%: Target D    with L. 1 Short Life Expectancy

> 20%: Target B    with L. 1 Ferriage in the Deep Fog

> 20%: Target A    with L. 1 Scythe that Chooses the Dead

> 20%: Target Self with L.15 Recover

---

> 原名：大樹の猛毒蟲

> 英文版名：Great Tree’s Poisonous Wasp

> 身份：3F的boss，推荐等级11级

---

> On turn % 2 = 1:

> 60%: Target A with L.1 Ultravenomous Needles #【超猛毒針】然属性单体直接攻击，带猛毒

> 40%: Target A with L.3 Venomous Fog #【猛毒の霧】然属性全体魔法攻击，带猛毒

> On turn % 2 = 0:

> Target A with L.1 Storm Of Yellow Drive

---

> 原名：大樹の麻痺蟲

> 英文版名：Great Tree’s Paralysing Wasp

> 身份：4F的boss，推荐等级15级

---

> On turn % 2 = 1:

> Target D with L.1 Ultraparalysis Needles #【超麻痺針】然属性单体直接攻击，带麻 痹

> Otherwise:

> 20%: Target A with L.1 Storm Of Yellow Drive

> 20%: Target A with L.1 Attack

> 30%: Target A with L.1 Paralyzing Fog #【麻痺の霧】风属性全体魔法攻击，带麻 痹

> 30%: Target A with L.1 Row Attack

---

> 原名：アリスの遠隔操作人形・改良型

> 英文版名：Alice’s Remote Doll V2

> 身份：4F的boss，推荐等级14级

---

> Target A with L.1 Row Attack

---

> 原名：藤原 妹紅

> 英文版名：Fujiwara no Mokou

> 身份：4F的boss，推荐等级17级

---

> On turn % 2 = 1:

> Target self with L.6 Regeneration #【リジェネレーション】自身技能，恢复1100HP，不消耗行动条

> After reviving: #在使用了【リザレクション】之后（整个战斗都生效）

> Target A with L.1 Fujiyama Volcano #【凱風快晴-フジヤマヴォルケイノ-】火属性全体直接攻击

> Once, If HP <= 75%:

> Target A with L.1 Tsuki no Iwakasa’s Curse #【月のいはかさの呪い】风属性全体直接攻击，带双攻debuff

> Once, If HP <= 25%:

> Target A with L.1 Tsuki no Iwakasa’s Curse

> Once, If HP <= 30%: #这里的判断优先级是次于上一个判断的，也就是说如果从30%+血一下被打到25%-血，会先触发上一个判断，过一个回合再触发这一个判断

>     Target A with L.1 Earth Shaker

> If HP >= 50%:

> 20%: Target A with L.1 Fire Bird -Flying Phoenix- #【火の鳥-鳳翼天翔-】火属性单体直接攻击

> 20%: Target A with L.1 Daze

> 15%: Target B with L.1 Spark Storm

> 15%: Target A with L.1 Row Attack

> 15%: Target A with L.1 Azure Arrow

> 15%: Target A with L.1 Attack

> Otherwise:

> 30%: Target A with L.1 Fire Bird -Flying Phoenix-

> 25%: Target A with L.1 Row Attack

> 25%: Target A with L.1 Azure Arrow

> 10%: Target B with L.1 Spark Storm

> 10%: Target A with L.1 Attack

---

> 原名：クラーケン

> 英文版名：Kraken

> 身份：5F的boss，推荐等级19级

---

> If var_nHits >= 1 and var_nHits <= 7: #若连击数在1-7之间

> Target A with L.1 Octangle Attack (1) #【オクタングルアタック】冷属性单体直接攻击，不消耗行动条

> var_nHits = var_nHits + 1 #连击数+1

> If var_nHits >= 8: #若连击数大于等于8（也就是从1增大到8，之前打了7下）

> Target A with L.1 Octangle Attack (2) #【オクタングルアタック】冷属性单体直接攻击，攻击后行动条为1000

> var_nHits = 0 #将连击数重置为0

> Once, If HP <= 66%:

> Target Self with L.1 Concentrate

> var_nHits = 1 #【集中】后将连击数置为1，下次行动开始连击

> Once, If HP <= 30%:

> Target Self with L.1 Concentrate

> var_nHits = 1

> Otherwise:

> 40%: Target A with L.1 Daze

> 25%: Target A with L.1 Leg Sweep

> 20%: Target A with L.1 Attack

> 15%: Target A with L.1 Storm Of Blue Rain

---

> 原名：鍵山 雛

> 英文版名：Hina Kagiyama

> 身份：5F的boss，推荐等级20级

---

> If HVY or TRR or SIL: #行动时，如果检测到自己带有钝重、恐怖或沉默

> Target Self with L.1 Spinning More Than Usual #【いつもより余計に回ってます】自身技能，解除除猛毒以外的异常状态，并给自己上全属性buff，不消耗行动条

> If ATKDBF or DEFDBF or MNDDBF or MAGDBF or SPDDBF: #行动时，如果检测到自己带有任意属性debuff

> Target Self with L.1 Curse Reversal #【厄反転】自身技能，将自己受到的所有debuff变换正负号（变成数值相同的buff），不消耗行动条

> Once, If HP <= 66%:

> Target A with L.1 Misfortune God’s Biorhythm #【厄神様のバイオリズム】冥属性全场技能，敌我方全体（玩家方指前排）全属性debuff

> Once, If HP <= 33%:

> Target A with L.1 Misfortune God’s Biorhythm

> If HP >= 50%:

> 19%: Target B with L.1 Storm Of Dark Flow

> 19%: Target B with L.1 Spark Storm

> 19%: Target B with L.1 Red Arrow #【紅の矢】火属性单体魔法攻击

> 19%: Target B with L.1 Dark Arrow

> 12%: Target A with L.1 Pain Flow #【ペインフロー】冥属性全体魔法攻击

> 12%: Target A with L.1 Old Lady Ohgane’s Fire #【大鐘婆の火】火属性全体魔法攻击，带全属性debuff

> Otherwise:

> 24%: Target A with L.1 Pain Flow

> 24%: Target A with L.1 Old Lady Ohgane’s Fire

> 18%: Target B with L.1 Spark Storm

> 14%: Target B with L.1 Red Arrow

> 12%: Target B with L.1 Storm Of Dark Flow

> 12%: Target B with L.1 Dark Arrow

> 6%: Target A with L.1 Misfortune God’s Biorhythm

---

> 原名：海揺の堅鋼花

> 英文版名：Blue Orchid

> 身份：6F的boss，推荐等级23级

---

> On turn % 2 = 1 and turn >= 3: #第三次行动开始，每隔一次就使用下一行的技能

> Target Self with L.1 Shell Melter #【甲殻融解】自身技能，效果在下两行（降低自身双防）

> def = max(300, def – 300) #每次降300，降到300为止

> mnd = max(300, mnd – 300)

> Otherwise:

> 20%: Target A with L.1 Dissolvent #【溶解液】然属性单体直接攻击，带钝重、双防debuff

> 20%: Target A with L.1 Paralyzing Fog

> 20%: Target B with L.1 Azure Arrow

> 20%: Target B with L.1 Storm Of Blue Rain

> 20%: Target B with L.1 Acid Rain #【酸性雨】然属性全体魔法攻击，带防御debuff

---

> 原名：比那名居 天子

> 英文版名：Tenshi Hinanawi

> 身份：6F的boss，推荐等级40级

---

> On turn 11, If HP <= 66% #在第11次行动时，如果HP小于等于66%

> Target Self with L.1 Escape #跑路，结束战斗，判定玩家胜利

> FN_58E2(803) #给予 カネノキ小判（Kanenoki Koban/Money-Growing Tree，累积特殊道具，每有一个增加战斗结束后的金钱掉落1%，最多25%） 作为战斗掉落物

> FN_58E2(804) #给予 ガリガリ勉強くんセット（Mr. Midnight Oil Set，累积特殊道具，每有一个增加战斗结束后的经验1%，最多25%） 作为战斗掉落物

> FN_58E2(805) #给予 週刊アイテム発見伝（Items Discovery Weekly，累积特殊道具，每有一个增加战斗结束后的物品掉落率1.6%，最多40%） 作为战斗掉落物

> On turn 11: #在第11次行动时（如果HP大于66%）

> Target self with L.1 Escape #跑路，结束战斗，判定玩家胜利

> Otherwise:

> Target A with L.1 Ame-no-Murakumo Slash #【天叢雲剣の一刃】灵属性单体直接攻击

> p.s.这也就意味着，如果玩家在天子第11次行动前打死了天子，获得的是胜利奖励（上面三个加一个神霊結界）；如果没能成功击杀天子让她跑了，但是跑的时候血量在66%以下，仍然可以获得上面的三个特殊道具作为奖励

---

> 原名：賢者の石・火

> 英文版名：Philosopher’s Stone – Fire

> 身份：5F的boss，推荐等级18级

---

> On turn % 2 = 1:

> Target A with L.1 Spark Storm

> On turn % 4 = 2:

> Target A with L.1 Red Curse #【赤の呪い】火属性全体魔法攻击，带攻击debuff

> On turn % 4 = 0:

> Target A with L.1 Dazing Fog #【衝撃の霧】火属性全体魔法攻击，带冲击

---

> 原名：賢者の石・水

> 英文版名：Philosopher’s Stone – Water

> 身份：6F的boss，推荐等级21级

---

> On turn % 2 = 1:

> Target A with L.1 Storm Of Blue Rain

> On turn % 4 = 2:

> Target A with L.1 Blue Curse #【蒼の呪い】冷属性全体魔法攻击，带防御debuff

> On turn % 4 = 0:

> Target A with L.1 HeavyFog #【鈍重の霧】冷属性全体魔法攻击，带钝重

---

> 原名：賢者の石・風

> 英文版名：Philosopher’s Stone – Wind

> 身份：6F的boss，推荐等级22级

---

> On turn % 2 = 1:

> Target A with L.1 Storm Of Yellow Drive

> On turn % 4 = 2:

> Target A with L.1 Yellow Curse #【黄の呪い】风属性全体魔法攻击，带速度debuff

> On turn % 4 = 0:

> Target A with L.1 Paralyzing Fog

---

> 原名：賢者の石・然

> 英文版名：Philosopher’s Stone – Earth

> 身份：7F的boss，推荐等级25级

---

> On turn % 2 = 1:

> Target A with L.1 Storm Of Wood Leaves (2)

> On turn % 4 = 2:

> Target A with L.1 Green Curse #【碧の呪い】然属性全体魔法攻击，带精神debuff

> On turn % 4 = 0:

> Target A with L.1 Venomous Fog

---

> 原名：賢者の石・魔

> 英文版名：Philosopher’s Stone – Mystic

> 身份：7F的boss，推荐等级27级

---

> On turn % 2 = 1:

> Target A with L.1 Storm Of Purple Magic

> On turn % 4 = 2:

> Target A with L.1 Purple Curse #【紫の呪い】魔属性全体魔法攻击，带魔力debuff

> On turn % 4 = 0:

> Target A with L.1 Madness Fog #【狂気の霧】魔属性全体魔法攻击，带冲击

---

> 原名：アリス・マーガトロイド

> 英文版名：Alice Margatroid

> 身份：7F的boss，推荐等级27级

---

> On turn 1:

> Target self with L.1 Resummon Doll #【人形召還】对本方使用，召唤人偶填满场上空位（最多4个），人偶有两种（每种召唤多少是随机的），属性和行动机制都有所不同，见下

> Once, If HP <= 75%:

> Target A with L.1 Trip Wire #【トリップワイヤー】物属性全体魔法攻击，带麻 痹、钝重、速度debuff

> Once, If HP <= 60%:

> Target A with L.1 Little Legion #【リトルレギオン】物属性全体魔法攻击（计算防御而非精神）

> Once, If HP <= 30%:

> Target A with L.1 Trip Wire

> When 3 dolls remain and 25% chance:

> Target self with L.1 Resummon Doll

> When 2 dolls remain and 50% chance:

> Target self with L.1 Resummon Doll

> When 1 doll remains and 75% chance:

> Target self with L.1 Resummon Doll

> When Alone:

> Target self with L.1 Resummon Doll

> # 可以从上面看出，小爱召唤人偶是随机的，优先级仅仅在3个血量符后面，场上人偶越少召唤概率越大（当然，人偶齐全的话肯定是不召唤的）。而且，一旦没有人偶在场上而且也没有发动血量符的条件，必定会再次召唤人偶。

> If HP >= 40%:

> 20%: Target B with L.1 Red Arrow

> 20%: Target B with L.1 Magical Light #【魔力光】魔属性单体魔法攻击

> 20%: Target A with L.1 Artful Sacrifice #【アーティフルサクリファイス】火属性单体魔法攻击

> 14%: Target A with L.1 Hanged Hourai Dolls #【首吊り蓬莱人形】魔属性一列魔法攻击

> 13%: Target A with L.1 Spark Storm

> 13%: Target A with L.1 Red Curse

> Otherwise:

> 30%: Target A with L.1 Artful Sacrifice

> 20%: Target A with L.1 Little Legion

> 15%: Target A with L.1 Hanged Hourai Dolls

> 10%: Target B with L.1 Red Arrow

> 10%: Target A with L.1 Spark Storm

> 10%: Target A with L.1 Red Curse

> 5%: Target A with L.1 Piercing Light #【貫通光】魔属性一列魔法攻击，精神倍率低

---

> 原名：アリスの人形・近接型

> 英文版名：Alice’s Doll – Support Type

---

> 66%: Target A with L.1 Attack

> 34%: Target A with L.1 Daze

---

> 原名：アリスの人形・魔法型

> 英文版名：Alice’s Doll – Magic Type

---

> 67%: Target A with L.1 Spark Storm

> 33%: Target A with L.1 Piercing Light

---

> 原名：密林の凶蔦眼

> 英文版名：Jungle’s Demonic Eye

> 身份：7F的boss，推荐等级27级

---

> On turn 1:

> Target Self with L.1 Tentacle Breed #【触手繁殖】对本方使用，召唤凶蔦眼のツタ填满场上空位

> On turn % 5 = 0:

> Target Self with L.1 Tentacle Breed

> Otherwise:

> 30%: Target A with L.1 Attack

> 20%: Target A with L.1 Swallow

> 20%: Target A with L.1 Whirlwind #【巻きつく】物属性单体直接攻击，带麻 痹

> 15%: Target A with L.1 Leaf Cutting Dance

> 15%: Target A with L.1 Leg Sweep

> #第5、10、……次行动时固定召唤，其他情况不召唤

---

> 原名：凶蔦眼のツタ

> 英文版名：Demonic Eyed Ivy

---

> If JDEye is alive: #如果本体（密林の凶蔦眼）还活着

> 50%: Target JDEye with L.12 Healing Power #【治癒の力】回复本体HP6576

> 35%: Target A     with L. 1 Attack

> 15%: Target A     with L. 1 Whirlwind

> Otherwise:

> 50%: Target A with L.1 Attack

> 50%: Target A with L.1 Whirlwind

---

> 原名：永江 衣玖

> 英文版名：Iku Nagae

> 身份：8F的boss，推荐等级29级

---

> Once, If HP <= 55%:

> Target self with L.1 Thundercloud Stickleback #【雷雲棘魚】自身技能，双攻100%buff

> After Thundercloud Stickleback: #上完buff下次行动

> Target A with L.1 Light Dragon’s Sigh #【光龍の吐息】风属性全体魔法攻击，带麻 痹、防御debuff

> Once, If HP <= 33%:

> Target self with L.1 Whiskers of the Dragon God #【龍神の髭】自身技能，速度100%buff，双防一定量debuff，另外附加下面的效果

> resDBFATK = 0

> resDBFDEF = 0

> resDBFMAG = 0

> resDBFMND = 0

> resDBFSPD = 0

> resDBFACC = 0

> resDBFEVA = 0

> #可以看到，这个技能过后，衣玖的全属性debuff抗性都被调整为0，可以随意调教了

> If HP >= 50%:

> 40%: Target B with L.1 Elekiter Dragon Palace

> 20%: Target A with L.1 Storm Of Yellow Drive

> 20%: Target A with L.1 Paralyzing Fog

> 20%: Target A with L.1 Green Curse

> Otherwise:

> 40%: Target B with L.1 Elekiter Dragon Palace

> 20%: Target A with L.1 Light Dragon’s Sigh

> 20%: Target A with L.1 Razor Wind #【カマイタチ】风属性全体魔法攻击，计算双防之和

> 10%: Target A with L.1 Paralyzing Fog

> 10%: Target A with L.1 Green Curse

---

> 原名：風見 幽香

> 英文版名：Yuuka Kazami

> 身份：8F的boss，推荐等级53级

---

> If HP <= 40%, After Master Spark: #若HP小于等于40%，且上一个动作为【极限火花】

> resSHK = 0 #将冲击抗性设置为0

> Target self with L.1 Concentrate #【集中】

> If HP <= 40%, After Concentrate: #若HP小于等于40%，且上一个动作为【集中】

> resSHK = 0

> Target A with L.1 Master Spark #【极限火花】魔属性全体魔法攻击，威力巨大

> If HP <= 40%: #若HP小于等于40%，这个判断语句是为了进入上面的循环而设置的

> resSHK = 0

> Target self with L.1 Concentrate

> If turn % 3 = 0:

> Target A with L.1 Gensokyo’s Reflowering #【幻想郷の開花】然属性全体魔法攻击，回复自身HP25445

> If PSN or PAR or HVY or SHK or TRR or SIL: #行动时若检测到自身带有猛毒、麻 痹、钝重、冲击、恐怖、沉默（但是麻 痹和冲击一般不会在行动时检测到）

> Target A with L.1 Beauty of Nature #【花鳥風月、嘯風弄月】然属性全体魔法攻击

> Otherwise:

> 40%: Target B with L.1 Flower Shot #【フラワーショット】然属性单体魔法攻击

> 10%: Target A with L.1 Storm Of Wood Leaves (2)

> 9%: Target A with L.1 Poison Spore #【毒胞子】然属性全体魔法攻击，带猛毒

> 9%: Target A with L.1 Paralysis Spore

> 9%: Target Self with L.1 Calming Scent #【駘蕩の香り】自身技能，全属性buff，不消耗行动条

> 9%: Target A with L.1 Deranging Aroma #【狂惑の匂い】然属性攻击，伤害为0，带全属性debuff

> 9%: Target A with L.1 Piercing Light

> 0%: Target B with L.1 Magical Light #由于bug，幽香不会使出这个技能

> #细心的读者可能已经发现了，上面这个选择支里面的概率总和为95%，也就是说幽香在这个选择支里有5%的可能性一回合啥都不干

---

> 原名：八雲 藍

> 英文版名：Ran Yakumo

> 身份：9F的boss，推荐等级34级

---

> Each turn:

> x = 0

> if flag 0E58 < 2, x = x + 1

> if flag 0E74 < 2, x = x + 1

> if flag 0E78 < 2, x = x + 1

> if flag 0E7C < 2, x = x + 1

> atk = (x * 100) + 1120

> mag = (x * 100) + 1120

> spd = (x *  50) +  256

> #上面的判断说明的是，每次行动时蓝会重置自己的双攻和速度，每多一个 藍の簡易式神 在场，双攻各加100，速度加50。

> When alone:

> Target Self with L.(x + 1) Summon Shikigami #【シキガミ招来】召唤藍の簡易式神填满场上空位

> If HP >= 50%:

> 25%: Target A with L.1 Princess Tenko #【プリンセス天狐】然属性全体魔法攻击

> 25%: Target A with L.1 Fox-Tanuki Youkai Laser #【狐狸妖怪レーザー】魔属性全体魔法攻击

> 25%: Target B with L.1 Piercing Light

> 25%: Target B with L.1 Destroy Magic

> Otherwise:

> 36%: Target B with L.1 Soaring En no Ozuno #【飛翔役小角】物属性复合直接攻击（计算攻击、魔力和敌方防御）

> 16%: Target B with L.1 Row Attack

> 16%: Target B with L.1 Attack

> 16%: Target A with L.1 Half Moon Slash

> 16%: Target A with L.1 1000 Needles

> #蓝召唤式神是没有式神在场才召唤

---

> 原名：藍の簡易式神

> 英文版名：Ran’s Simple Shikigami

---

> If Ran is alive: #蓝还存活时

> Target Ran with L.1 Strengthen Sorcery #【巫術強化】给主人（蓝）上全属性25%buff

> Otherwise:

> Target A with L.1 Attack

---

> 由于字数问题，上篇就到这里了，续集敬请期待~

> 参考网站：

> [null|https://www.shrinemaiden.org/forum/index.php/topic,21518.msg1406579.html#msg1406579]

> [null|https://www54.atwiki.jp/thlabyroth2/pages/87.html]

> [null|https://www54.atwiki.jp/thlabyroth2/pages/116.html]

> [null|https://www54.atwiki.jp/thlabyroth2/pages/154.html]

	