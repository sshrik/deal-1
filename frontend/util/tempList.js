const tempData = [
  {
    title: '파랑 선풍기',
    location: '역삼동',
    lastTime: '2',
    price: '24,500원',
    comment: 1,
    like: 0,
    imgSrc: 'blueFan.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '빈티지 밀크 글래스 전등',
    location: '역삼동',
    lastTime: '2',
    price: '158,500원',
    comment: 0,
    like: 1,
    imgSrc: 'lamp.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '입사귀 포스터',
    location: '역삼동',
    lastTime: '3',
    price: '59,000원',
    comment: 0,
    like: 0,
    imgSrc: 'leaves.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '도자기 화병 5종',
    location: '역삼동',
    lastTime: '3',
    price: '14,500원',
    comment: 3,
    like: 10,
    imgSrc: 'poetry.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '빈티지 일본 경대',
    location: '역삼동',
    lastTime: '3',
    price: '180,000원',
    comment: 0,
    like: 2,
    imgSrc: 'mirror.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '파랑 선풍기',
    location: '역삼동',
    lastTime: '2',
    price: '24,500원',
    comment: 1,
    like: 0,
    imgSrc: 'blueFan.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '빈티지 밀크 글래스 전등',
    location: '역삼동',
    lastTime: '2',
    price: '158,500원',
    comment: 0,
    like: 1,
    imgSrc: 'lamp.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '입사귀 포스터',
    location: '역삼동',
    lastTime: '3',
    price: '59,000원',
    comment: 0,
    like: 0,
    imgSrc: 'leaves.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '도자기 화병 5종',
    location: '역삼동',
    lastTime: '3',
    price: '14,500원',
    comment: 3,
    like: 10,
    imgSrc: 'poetry.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
  {
    title: '빈티지 일본 경대',
    location: '역삼동',
    lastTime: '3',
    price: '180,000원',
    comment: 0,
    like: 2,
    imgSrc: 'mirror.png',
    specImage: ['roller1.png', 'roller2.png', 'roller3.png'],
    chat: 0,
    view: 1,
    seller: 'USERNAME_chj',
    nowSelling: true,
    category: '디지털기기',
    iLike: false,
    specDetail:
      '어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지 특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나, 거실에 장식용으로 추천해드립니다. 단품 입고되었습니다.\n새 제품으로 보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235입니다.',
  },
];

const chattingList = [
  {
    sender: 'UserC',
    lastMsg: '혹시 팔렸나요?',
    isCheck: false,
    timeStemp: '15',
    unChecked: 13,
    imgSrc: 'roller1.png',
  },
  {
    sender: 'UserC',
    lastMsg: '혹시 팔렸나요?',
    isCheck: true,
    timeStemp: '15',
    unChecked: 0,
    imgSrc: 'roller1.png',
  },
];

/*
const categories = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '게임/취미',
  '생활/가공식품',
  '스포츠/레저',
  '여성패션/잡화',
  '남성패션/잡화',
  '유아동',
  '뷰티/미용',
  '반려동물',
  '도서/티켓/음반',
  '식물',
  '기타 중고물품',
];
 */
// export default tempData;
export { tempData, chattingList };
