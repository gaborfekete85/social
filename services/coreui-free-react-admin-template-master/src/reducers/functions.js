const initialState = {
  list: [
    {
      id: '1',
      name: "Barber / Fodrasz",
      logo: "https://m.blog.hu/sp/sporolok/image/blog_post/barber_shop/barber_shop.jpg"
    }, 
    {
      id: '2',
      name: "Körmös",
      logo: "https://i.ytimg.com/vi/FUWOHzPuMMc/maxresdefault.jpg"
    }, 
    {
      id: '3',
      name: "Pedikűr",
      logo: "https://st2.depositphotos.com/5336146/9585/i/950/depositphotos_95859272-stock-photo-closeup-photo-of-a-beautiful.jpg"
    }, 
    {
      id: '4',
      name: "Smink",
      logo: "https://i.pinimg.com/originals/62/f9/63/62f9631a271f92cea3f09ed5262e7e50.jpg"
    }, 
    {
      id: '5',
      name: "Masszázs",
      logo: "https://www.post-nauders.com/typo3temp/assets/images/csm_istock_000062693352_xxxlarge_8a892acd86_4164435c94.jpg"
    }
  ]
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}
