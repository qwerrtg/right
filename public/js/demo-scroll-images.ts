let vConsole = new VConsole()
let camera = document.querySelector('#camera')
let playground = document.querySelector('#playground') as HTMLElement
playground.addEventListener('click', clickPlayground)

function initDom() {
  const list = [
    ['https://scpic.chinaz.net/files/pic/pic9/202101/apic30145.jpg', 'https://scpic.chinaz.net/files/pic/pic9/201311/apic2098.jpg', 'https://img.sj33.cn/uploads/allimg/201101/20110124212832961.jpg', 'https://scpic.chinaz.net/files/pic/pic9/201308/gpic587.jpg', 'https://tse2-mm.cn.bing.net/th/id/OIP-C.Zxtf2X2EddV-g7hKyBhilAHaQB?pid=ImgDet&rs=1'],
    ['https://ts1.cn.mm.bing.net/th/id/R-C.ebc5c9ad1a0489383aecfd0a08edfd99?rik=B%2bvS7g2eYPgE1w&riu=http%3a%2f%2fwww.46ps.com%2fuploadfile%2f2013%2f1219%2f20131219043836142.jpg&ehk=0M8obBK0jXI2izCA5ul6WbX2UFf46Ddxp822wuRQYvI%3d&risl=&pid=ImgRaw&r=0', 'https://img.zcool.cn/community/01a9635b52ec8da80121ade04a5c54.JPG@1280w_1l_2o_100sh.jpg', 'https://img.zcool.cn/community/01f652554b4c81000001bf7244de67.jpg@1280w_1l_2o_100sh.jpg', 'https://scpic.chinaz.net/files/pic/pic9/201607/apic21997.jpg', 'https://ts1.cn.mm.bing.net/th/id/R-C.7041dee0346742090284136c4b7f8950?rik=PegVqAV2g%2fWb8A&riu=http%3a%2f%2fpic.sc.chinaz.com%2ffiles%2fpic%2fpic7%2fxpic572.jpg&ehk=yRshhWlFfK%2bi1fGj3f18MTrdpXUpqe5De19jhGGEtY4%3d&risl=&pid=ImgRaw&r=0'],
    ['https://bpic.588ku.com/back_origin_min_pic/21/07/09/ae519212b30d03170638460ba35dc7b7.jpg!/fw/750/quality/99/unsharp/true/compress/true', 'https://tse4-mm.cn.bing.net/th/id/OIP-C.CAy_PbxZ3-7aeqMmQJHF1gHaQd?pid=ImgDet&rs=1', 'https://ts1.cn.mm.bing.net/th/id/R-C.202ca8753ea75784870795e42b10e8db?rik=0ipOshg65Am1aQ&riu=http%3a%2f%2fpic.sc.chinaz.com%2ffiles%2fpic%2fpic9%2f202009%2fhpic2906.jpg&ehk=ub0ca4Na%2b%2bsco0Xn4m8dCz5zJ0rAmkRJIa6FcDUFmZE%3d&risl=&pid=ImgRaw&r=0', 'https://pic3.zhimg.com/v2-271dfc8ccbebc35b059c85fc34880228_r.jpg?source=1940ef5c', 'https://scpic.chinaz.net/files/pic/pic9/202009/apic27508.jpg'],
    ['https://ts1.cn.mm.bing.net/th/id/R-C.cf67e07d8713288a9d0ebcc25e7b4801?rik=XjZxQsA7hLTzCA&riu=http%3a%2f%2fscpic.chinaz.net%2ffiles%2fpic%2fpic9%2f201503%2fapic10362.jpg&ehk=M1nHSvbXX2AW0kBwGglcRtE2fRgkcbs%2bTpkumZLrDaE%3d&risl=&pid=ImgRaw&r=0', 'https://ts1.cn.mm.bing.net/th/id/R-C.b962dc6ec1a7b3003ba70983d8a35f03?rik=%2bRUyFyghTFW3ow&riu=http%3a%2f%2fimgs.ppt118.com%2fppt%2fbeijing%2fdetail%2f2019%2f03%2f29%2f374_detail-1.jpg_w800&ehk=hMopXPWfSBltbUemNNhMLszwxHGr3iiwFkrJiog9MWU%3d&risl=&pid=ImgRaw&r=0', 'https://tse2-mm.cn.bing.net/th/id/OIP-C.0WavTrykz3VRCwWPx1Y1vAHaQC?pid=ImgDet&rs=1', 'https://img3.redocn.com/tupian/20140910/xindongyouximeinvzhaopian_3014687.jpg', 'https://ts1.cn.mm.bing.net/th/id/R-C.0fcf8512cf9519d48ca9d45e11d39184?rik=%2fPqu9lATYwU0pA&riu=http%3a%2f%2fpic.sc.chinaz.com%2ffiles%2fpic%2fpic9%2f201306%2fxpic11689.jpg&ehk=E8HECMhQVvBxAgeU0gIK2ClNtPqIRAv2t%2bdVzJWhBRk%3d&risl=&pid=ImgRaw&r=0'],
    ['https://img.jjppt.com/bjuploads/images/2019/03/29/15561030101210.jpg?x-oss-process=image/resize,w_800', 'https://scpic.chinaz.net/files/pic/pic9/201401/apic2855.jpg', 'https://www.huimengya.com/uploads/ch_img/72_3.jpg', 'https://tse3-mm.cn.bing.net/th/id/OIP-C.29m_a03vVYLU92BpSOXSfgAAAA?pid=ImgDet&rs=1', 'https://scpic.chinaz.net/files/pic/pic6/pic1281.jpg']
  ]
  let fragment = document.createDocumentFragment()
  let div: HTMLElement
  list.forEach(sub_list => {
    div = document.createElement('div')
    div.classList.add('column')
    let box, img
    sub_list.forEach(item => {
      box = document.createElement('div')
      box.classList.add('preview-box')
      img = document.createElement('img')
      img.classList.add('preview-img')
      img.src = item
      box.append(img)
      div.append(box)
    })
    fragment.append(div)
  })
  playground.append(fragment)
}

function initHammer() {
  let hammer = new Hammer(playground)
  hammer.on('swipeleft', () => horizonChange(0))
  hammer.on('swiperight', () => horizonChange(-1))
  hammer.on('swipeup', () => verticalChange(0))
  hammer.on('swipedown', () => verticalChange(-1))
  hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })
}

initDom()
initHammer()

function verticalChange(direction: 0 | -1) {
  let columns = playground.querySelectorAll('.column')
  let current_column = columns[2]
  if (!current_column) return
  let boxes = Array.from(current_column.querySelectorAll('.preview-box'))
  let move_box = direction ? boxes[boxes.length - 1] : boxes[0]
  if (!move_box) return
  current_column.insertAdjacentElement(direction ? 'afterbegin' : 'beforeend', move_box)
}

function horizonChange(direction: 0 | -1) {
  let columns = Array.from(playground.querySelectorAll('.column'))
  let move_column = direction ? columns[columns.length - 1] : columns[0]
  if (!move_column) return
  playground.insertAdjacentElement(direction ? 'afterbegin' : 'beforeend', move_column)
}

function clickPlayground(e: MouseEvent) {
  let target = <HTMLElement>e.target
  if (target === document.querySelector('.column:nth-child(3) .preview-box:nth-child(3) .preview-img')) {
    let img = <HTMLImageElement>target.cloneNode()
    img.id = 'preview_img'
    img.setAttribute('class', '')
    document.body.append(img)
    img.addEventListener('click', () => {
      img.classList.toggle('preview-show')
      setTimeout(() => {
        img.remove()
      }, 300)
    })
    setTimeout(() => {
      img.classList.toggle('preview-show')
    }, 0)
  }
}