import React from "react";
import { connect } from "react-redux";
import AllFoodItem from "./AllFoodItem";

const fakeData = [
  {
    id: 1,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
    "https://cdn.mos.cms.futurecdn.net/8HR4FLWRv8DqYQqXoQnhB8.jpg",

  },
  {
    id: 2,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
        "https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417",

  },
  {
    id: 3,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
        "https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417",

  },
  {
    id: 4,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
        "https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417",

  },
  {
    id: 5,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
        "https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417",

  },
  {
    id: 6,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
        "https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417",

  },
  {
    id: 7,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
        "https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417",

  },
  {
    id: 8,
    name: 'Big Hearty Radish',
    cost: 10,
    imageUrl:
        "https://static.wikia.nocookie.net/zelda/images/f/f1/Breath_of_the_Wild_Vegetables_%28Radishes%29_Big_Hearty_Radish_%28Icon%29.png/revision/latest?cb=20170808072417",

  },
  {
    id: 9,
    cost: 9,
    name: "red food",
    imageUrl:
      "https://www.qsrmagazine.com/sites/default/files/styles/story_page/public/phut_0.jpg?itok=h30EAnkk",

  },

];

class AllFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="allProductsContainer">
        <div id="allProuctsHolder">
        {
          fakeData.map((element) => {
            return <AllFoodItem
            name={element.name}
            key={element.id}
            cost={element.cost}
            imageUrl={element.imageUrl} />
          })
        }

        </div>


      </div>
    );
  }
}

export default AllFood;
