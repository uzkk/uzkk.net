export default class SortObject {
  constructor (data) {
    this.id = data[0]
    this.name = data[1]
    this.nick = data[2]
    // 为了方便文件名排序(?)
    this.img = 'c' + (this.id)
    this.ext = '.png'
  
    // 上/下位关系（父子结点？）
    this.parent = null
    this.isEven = false // 上位平局了？
    this.children = []
  }

  
  /**
	* 获得图片路径（。。。路径跟跳过日语居然一样）
	*/
  getImagePath () {
    var strImageSrc = './char/'
    // 没默认值时找文件夹(?)
    if (FacePattern != 0 && FacePattern != FacePatternDefault) {
      strImageSrc += 'f' + FacePattern + '/'
    }
    strImageSrc += this.img + this.ext
    // 没图片时的特殊设定
    if (FacePattern == noFacePatternNo) {
      strImageSrc = './char/noImage.png'
    }
    return strImageSrc
  }

  /**
	* 获得排名
	*/
  rank () {
    if (this.parent) {
      return (this.isEven ? this.parent.rank() : this.level())
    }
    return 0
  }

  /**
	* 获得结点所在深度
	*/
  level () {
    if (this.parent) {
      return this.parent.level() + 1
    }
    return 0
  }

  /**
	* 追加子结点
	*/
  add (child, doEvenAction) {
    // 首先断开child父结点与child的连接 1R-（这个1R-是个啥？？）
    if (child.parent) {
      child.parent.children.splice(child.parent.children.indexOf(child), 1)
    }

    // 特别处理平局情形
    if (doEvenAction) {
      // 把自己的子结点全部交出去 2A-, 3a+
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
	* 字符串表示
	*/
  /* toString () {
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
  } */

  /**
	* 提取子结点
	*/
  /* ask (showRank) {
    // 若指定了两边的角色，则搜索这俩
    // 这俩角色都存在，则返回这俩角色
    // 有不存在者，则按照后面的方式随机获取
    // var isForceRandom = (arguments[0] == 'PASS')
    if (this.children.length == 0) {
      return false
    }
    if (this.children.length == 1) {
      // 不存在相同排名的角色了 = 下一名确定
      // var currentResultRank = this.level() + 1
      // showRank(currentResultRank)
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
  } */

  /**
	* 删除
	*/
  remove () {
    while (this.children.length > 0) {
      this.parent.add(this.children[0], false)
    }
    this.parent.children.splice(this.parent.children.indexOf(this), 1)
  }

  /**
	* 全体结点中搜索 resourceId 并返回 SortObject。没找到则返回 null。
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
