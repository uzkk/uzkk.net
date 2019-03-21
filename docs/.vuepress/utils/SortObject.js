export default class SortObject {
  constructor (data) {
    this.id = data[0]
    this.name = data[1]
    this.nick = data[2]
    // ファイル名ソートしやすいように
    this.img = 'c' + (this.id)
    this.ext = '.png'
  
    // 上位関係と下位関係
    this.parent = null
    this.isEven = false // 上位と引き分けているか？
    this.children = []
  }

  
  /**
	* 画像パス取得
	*/
  getImagePath () {
    var strImageSrc = './char/'
    // デフォルト以外はフォルダを掘る
    if (FacePattern != 0 && FacePattern != FacePatternDefault) {
      strImageSrc += 'f' + FacePattern + '/'
    }
    strImageSrc += this.img + this.ext
    // 画像なし特殊設定
    if (FacePattern == noFacePatternNo) {
      strImageSrc = './char/noImage.png'
    }
    return strImageSrc
  }

  /**
	* 順位取得
	*/
  rank () {
    if (this.parent) {
      return (this.isEven ? this.parent.rank() : this.level())
    }
    return 0
  }

  /**
	* 深さ取得
	*/
  level () {
    if (this.parent) {
      return this.parent.level() + 1
    }
    return 0
  }

  /**
	* 子ノードに追加
	*/
  add (child, doEvenAction) {
    // まず子の関係性を断つ 1R-
    if (child.parent) {
      child.parent.children.splice($.inArray(child, child.parent.children), 1)
    }

    // 引き分け特有の処理をする。
    if (doEvenAction) {
      // 自分の子をすべて子に明け渡す 2A-, 3a+
      var copies = this.children.splice(0, this.children.length)
      for (var i = copies.length - 1; i >= 0; i--) {
        copies[i].parent = child
      }
      Array.prototype.push.apply(child.children, copies)
    }

    // 2A+
    this.children.push(child)
    child.parent = this
  }

  /**
	* 文字列表示
	*/
  toString () {
    var str = '<li>' + this.name + '(' + this.rank() + ')'
    if (this.children.length > 0) {
      str += '<ul>'
      for (var i = 0; i < this.children.length; i++) {
        str += this.children[i].toString()
      }
      str += '</ul>'
    }
    str += '</li>'
    return str
  }

  /**
	* 子ノードを絞込み
	*/
  ask (question) {
    // 質問するキャラクターの指定がある場合、キャラクターを検索
    // 検索結果が両方とも存在した場合、その2キャラを返す。
    // 存在しなければ通常通りにランダム検索したキャラを返す。
    if (question) {
      var left = this.findSortObjectById(question[0])
      var right = this.findSortObjectById(question[1])
      if (left !== null && right !== null) {
        return [left, right]
      }
    }
    var isForceRandom = (arguments[0] == 'PASS')
    if (this.children.length == 0) {
      return false
    }
    if (this.children.length == 1) {
      // 同じ順位のキャラがいなくなった＝順位が確定した
      var currentResultRank = this.level() + 1
      var captionText = '現在、' + currentResultRank + ' 位まで確定しています。'
      $('#caption').text(captionText)
      $('#caption').show()
      return this.children[0].ask()
    }
    var both = [0, 0]
    while (true) {
      if (both[0] != both[1]) {
        break
      }
      for (var i in [0, 1]) {
        both[i] = Math.floor(Math.random() * this.children.length)
      }
    }
    return [this.children[both[0]], this.children[both[1]]]
  }

  /**
	* 削除
	*/
  remove () {
    while (this.children.length > 0) {
      this.parent.add(this.children[0], false)
    }
    this.parent.children.splice($.inArray(this, this.parent.children), 1)
  }

  /**
	* ノード全体をリソースIDで検索して SortObject を返す。見つからなければ null を返す。
	*/
  findSortObjectById (resourceId) {
    if (this.id === resourceId) {
      return this
    }
    var len = this.children.length
    for (var i = 0; i < len; i++) {
      var result = this.children[i].findSortObjectById(resourceId)
      if (result !== null) {
        return result
      }
    }
    return null
  }
}
