/*
  Data for seed.js is located here
*/

// Create users
const userSeed = [
  {
    username: 'link',
    email: 'link@hyrule.com',
    password: 'link123',
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/archive/f/fd/20190222210027%21Link.png',
    isAdmin: true,
  },
  {
    username: 'zelda',
    email: 'zelda@hyrule.com',
    password: 'zelda123',
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/thumb/0/02/Zelda-botw.png/530px-Zelda-botw.png',
    isAdmin: true,
  },
  {
    username: 'daruk',
    email: 'daruk@hyrule.com',
    password: 'daruk123',
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/thumb/d/d2/Daruk.png/755px-Daruk.png',
    isAdmin: true,
  },
  {
    username: 'ganon',
    email: 'ganon@hyrule.com',
    password: 'ganon123',
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/thumb/e/e6/Calamity_Ganon_-_HWAoC.png/800px-Calamity_Ganon_-_HWAoC.png',
    isAdmin: false,
  },
];

// Create products
const productSeed = [
  {
    name: 'Apple',
    description:
      'A common fruit found on trees all around Hyrule. Eat it fresh, or cook it to increase its effect.',
    hearts: 0.5,
    inventory: 50,
    cost: 3,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/c/c3/Apple-botw.png',
  },
  {
    name: 'Palm Fruit',
    description:
      "Fruit from palm trees that grow near the ocean. It doesn't offer any special effects but will increase your heart recovery when used as an ingredient.",
    hearts: 1,
    inventory: 23,
    cost: 4,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/4/42/Palm_Fruit.png',
  },
  {
    name: 'Wildberry',
    description:
      "A fruit that grows in cold, snowy regions known for its tangy, sweet flavor. It doesn't offer any special effects, but it's a popular cooking ingredient.",
    hearts: 0.5,
    inventory: 65,
    cost: 3,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/9/9e/Wildberry.png',
  },
  {
    name: 'Hearty Durian',
    description:
      "This fruit's mighty odor has earned it the nickname 'king of fruits.' It offers immense restorative powers; dishes cooked with it will temporarily increase your maximum hearts.",
    hearts: 3,
    inventory: 31,
    cost: 15,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/7/7a/Hearty_Durian.png',
  },
  {
    name: 'Hydromelon',
    description:
      'This resilient fruit can flourish even in the heat of the desert. The hydrating liquid inside provides a cooling effect that, when cooked, increases your heat resistance.',
    hearts: 0.5,
    inventory: 86,
    cost: 4,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/0/0f/Hydromelon.png',
  },
  {
    name: 'Voltfruit',
    description:
      "Cacti found in the Gerudo Desert bear this sweet fruit. It's naturally insulated, so when cooked into a dish, it provides resistance against electricity.",
    hearts: 0.5,
    inventory: 48,
    cost: 4,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/8/89/Voltfruit.png',
  },
  {
    name: 'Hylian Shroom',
    description:
      'A common mushroom found near trees around Hyrule. Eat it to restore half a heart',
    hearts: 0.5,
    inventory: 69,
    cost: 3,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/d/d7/Hylian_Shroom.png',
  },
  {
    name: 'Endura Shroom',
    description:
      'A rare yellowish-orange mushroom. Cook it before eating to temporarily increase your stamina limit.',
    hearts: 1,
    inventory: 27,
    cost: 24,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/3/32/Endura_Shroom.png',
  },
  {
    name: 'Stamella Shroom',
    description:
      "A green mushroom that grows near trees in the forest. It's chock-full of natural energy. Cook it to release its stamina-restoration properties.",
    hearts: 0.5,
    inventory: 55,
    cost: 5,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/8/8c/Stamella-Shroom.png',
  },
  {
    name: 'Hearty Truffle',
    description:
      'This rare mushroom has a rich scent. Cook it before eating to temporarily increase your maximum hearts.',
    hearts: 2,
    inventory: 73,
    cost: 6,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/4/40/Hearty_Truffle.png',
  },
  {
    name: 'Big Hearty Truffle',
    description:
      "Years of going unpicked have allowed this hearty truffle to grow quite large. It's chock- full of nutrients. When cooked into a dish, it temporarily increases your maximum hearts.",
    hearts: 3,
    inventory: 14,
    cost: 15,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/0/0b/Big_Hearty_Truffle.png',
  },
  {
    name: 'Hearty Radish',
    description:
      'A rare radish that grows best in sunny plains. Cook it before eating to temporarily increase your maximum hearts.',
    hearts: 2.5,
    inventory: 8,
    cost: 8,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/4/49/Hearty_Radish.png',
  },
  {
    name: 'Big Hearty Radish',
    description:
      "This hearty radish has grown much larger than the average radish. It's rich in analeptic compounds that, when cooked into a dish, temporarily increase your maximum hearts",
    hearts: 4,
    inventory: 0,
    cost: 15,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/0/0c/Big_Hearty_Radish.png',
  },
  {
    name: 'Hyrule Herb',
    description:
      'This healthy herb grows abundantly in the plains of Hyrule. Cook it before eating to increase the number of hearts it restores.',
    hearts: 1,
    inventory: 17,
    cost: 3,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/2/2b/Hyrule_Herb.png',
  },
  {
    name: 'Swift Carrot',
    description:
      'This carrot is cultivated extensively in Kakariko Village. It strengthens the legs and hips when cooked into a dish, which helps increase your movement speed.',
    hearts: 0.5,
    inventory: 44,
    cost: 4,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/4/4d/Swift_Carrot.png',
  },
  {
    name: 'Endura Carrot',
    description:
      'Highly valued as a medicinal plant, this carrot contains large amounts of nourishing energy. When cooked into a dish, it boosts your stamina beyond its maximum limit.',
    hearts: 2,
    inventory: 36,
    cost: 30,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/0/09/Endura_Carrot.png',
  },
  {
    name: 'Fortified Pumpkin',
    description:
      'An extremely tough pumpkin raised in village fields. When cooked, that toughness manifests itself by considerably upping defense.',
    hearts: 0.5,
    inventory: 53,
    cost: 5,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/c/c1/Fortified_Pumpkin.png',
  },
  {
    name: 'Raw Meat',
    description:
      'Meat obtained from animals in plains and forests. You can eat it raw, but cooking it will make it more delicious and nutritious.',
    hearts: 1,
    inventory: 93,
    cost: 32,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/e/e9/Raw_Meat.png',
  },
  {
    name: 'Raw Prime Meat',
    description:
      "A fresh, high-quality piece of animal meat. This stuff isn't easy to come by, so savor it. Cook it to recover more hearts.",
    hearts: 1.5,
    inventory: 59,
    cost: 60,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/0/09/Raw_Prime_Meat.png',
  },
  {
    name: 'Raw Gourmet Meat',
    description:
      "This prized cut of meat is usually from a large animal. Any connoisseur would rank this tender, juicy cut of meat 'gourmet.' Expect an exquisite meal when cooking with this.",
    hearts: 3,
    inventory: 26,
    cost: 100,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/2/23/Raw_Gourmet_Meat.png',
  },
  {
    name: 'Raw Bird Drumstick',
    description:
      'This meat is tougher and chewier than a standard steak. Tastes better cooked.',
    hearts: 1,
    inventory: 95,
    cost: 8,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/f/f4/Raw_Bird_Drumstick.png',
  },
  {
    name: 'Raw Bird Thigh',
    description:
      "A high-quality piece of meat that's hard to come by. You can eat it raw, but cooking it first will recover more hearts.",
    hearts: 1.5,
    inventory: 46,
    cost: 15,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/e/e4/Raw_Bird_Thigh.png',
  },
  {
    name: 'Raw Whole Bird',
    description:
      'This prized meat can be obtained from certain birds. It gets full points for flavor, nutrition, and volume. It pairs perfectly with other ingredients or can be enjoyed alone.',
    hearts: 3,
    inventory: 17,
    cost: 38,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/f/ff/Raw_Whole_Bird.png',
  },
  {
    name: 'Hyrule Bass',
    description:
      'An ordinary fish that can be found all over Hyrule. It can be eaten raw, but cooking it amplifies its healing benefits.',
    hearts: 1,
    inventory: 74,
    cost: 15,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/7/7d/Hyrule_Bass.png',
  },
  {
    name: 'Staminoka Bass',
    description:
      'This Hyrule bass got to be the biggest fish by never getting caught (until now). Its long life results in a cooked dish that will restore a lot of stamina.',
    hearts: 1.5,
    inventory: 26,
    cost: 31,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/7/7e/Staminoka_Bass.png',
  },
  {
    name: 'Hearty Bass',
    description:
      'This large fish lives near the shoreline. Its sizable body can store a lot of nutrients. When cooked into a dish, it will temporarily increase your maximum hearts.',
    hearts: 2.5,
    inventory: 20,
    cost: 72,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/c/c6/Hearty_Bass.png',
  },
  {
    name: 'Chillfin Trout',
    description:
      'This blue trout prefers cold bodies of water. Its skin contains enzymes that keep its body cool, and when cooked into a dish, it will temporarily boost your heat resistance.',
    hearts: 1,
    inventory: 46,
    cost: 24,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/a/aa/Chillfin_Trout.png',
  },
  {
    name: 'Voltfin Trout',
    description:
      'This trout makes its home in the freshwater lakes. Its scales have an insulating compound that, when cooked into a dish, offers resistance to electricity.',
    hearts: 1,
    inventory: 41,
    cost: 24,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/f/fa/Voltfin_Trout.png',
  },
  {
    name: 'Sizzlefin Trout',
    description:
      'This red trout prefers warm bodies of water. It has a special organ specifically for storing heat. When cooked into a dish, it will temporarily increase your resistance to the cold.',
    hearts: 1,
    inventory: 38,
    cost: 24,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/c/c8/Sizzlefin_Trout.png',
  },
  {
    name: 'Stealthfin Trout',
    description:
      'Consuming the bioluminescent compound that makes this fish glow in the dark will increase concentration. Dishes cooked with it will suppress noise when consumed.',
    hearts: 1,
    inventory: 35,
    cost: 24,
    imageUrl:
      'https://www.zeldadungeon.net/wiki/images/6/64/Stealthfin_Trout.png',
  },
  {
    name: 'Hearty Salmon',
    description:
      'This fish makes its home in cold water, giving it extra layers of fat. It temporarily increases your maximum hearts when used in cooking.',
    hearts: 3,
    inventory: 26,
    cost: 40,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/3/31/Hearty_Salmon.png',
  },
  {
    name: 'Mighty Carp',
    description:
      'This freshwater fish lives alongside its less mighty carp ilk. A compound in its liver promotes muscle growth. Dishes cooked with it will temporarily increase your attack power.',
    hearts: 1,
    inventory: 37,
    cost: 10,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/8/80/Mighty_Carp.png',
  },
  {
    name: 'Armored Carp',
    description:
      'Calcium deposits in the scales of this ancient fish make them as hard as armor. Cooking it into a dish will fortify your bones, temporarily increasing your defense.',
    hearts: 1,
    inventory: 33,
    cost: 10,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/1/1a/Armored_Carp.png',
  },
  {
    name: 'Sanke Carp',
    description:
      'This wild armored carp has been bred into a prizewinning fish. Its beautifully colored markings do not occur in nature. It offers no special effects when cooked.',
    hearts: 1.5,
    inventory: 23,
    cost: 20,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/9/91/Sanke_Carp.png',
  },
  {
    name: 'Mighty Porgy',
    description:
      "This ocean-dwelling fish comes with one rude attitude. The compounds in its flesh elevate your competitive spirit when it's cooked into a dish, thus increasing your attack power.",
    hearts: 1,
    inventory: 40,
    cost: 10,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/d/d5/Mighty_Porgy.png',
  },
  {
    name: 'Armored Porgy',
    description:
      "This porgy's body is covered in armor-hard scales. The compounds in its scales, when cooked into a dish, fortify your bones and temporarily boost your defense.",
    hearts: 1,
    inventory: 8,
    cost: 10,
    imageUrl: 'https://www.zeldadungeon.net/wiki/images/0/0a/Armored_Porgy.png',
  },
];

// Create categories
const categorySeed = [
  {
    name: 'Fruit',
  },
  {
    name: 'Mushroom',
  },
  {
    name: 'Vegetable',
  },
  {
    name: 'Meat',
  },
  {
    name: 'Fish',
  },
];

// Create cart quantities
const cartSeed = [
  {
    quantity: 1,
  },
  {
    quantity: 2,
  },
  {
    quantity: 3,
  },
  {
    quantity: 4,
  },
  {
    quantity: 5,
  },
  {
    quantity: 1,
  },
  {
    quantity: 2,
  },
  {
    quantity: 3,
  },
  {
    quantity: 4,
  },
  {
    quantity: 5,
  },
];

module.exports = {
  userSeed,
  productSeed,
  categorySeed,
  cartSeed,
};
