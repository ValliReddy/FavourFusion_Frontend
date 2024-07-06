import React, { useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import CommentSection from './Comments';

const Biryani = () => {

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="menu-card">
      <div className="card" ref={componentRef}>
        <div className="inner">
          <h1>Exotic Fragrance: Authentic Biryani Recipe</h1>
          <span className="image main">
            <img src="images/biryani.jpg" alt="" style={{ width: '50%', maxWidth: '700px' }} />
          </span>
          <h2>Ingredients:</h2>
          <ul>
            <li>2 cups basmati rice</li>
            <li>500g chicken, cut into pieces</li>
            <li>2 large onions, thinly sliced</li>
            <li>4 tomatoes, chopped</li>
            <li>1/2 cup plain yogurt</li>
            <li>1/4 cup fresh cilantro, chopped</li>
            <li>1/4 cup fresh mint leaves, chopped</li>
            <li>4 green chilies, slit lengthwise</li>
            <li>1 tablespoon ginger-garlic paste</li>
            <li>1 teaspoon turmeric powder</li>
            <li>1 teaspoon red chili powder</li>
            <li>1 teaspoon garam masala</li>
            <li>1/2 teaspoon cumin seeds</li>
            <li>4 cloves</li>
            <li>4 cardamom pods</li>
            <li>2-inch cinnamon stick</li>
            <li>Salt to taste</li>
            <li>Ghee or oil for cooking</li>
          </ul>
          <h2>Instructions:</h2>
          <ol>
            <li>Wash the basmati rice under running water until the water runs clear. Soak the rice in water for 30 minutes, then drain and set aside.</li>
            <li>In a large skillet or pot, heat some ghee or oil over medium heat. Add the sliced onions and cook until they turn golden brown. Remove half of the fried onions and set aside for garnishing.</li>
            <li>To the remaining onions in the skillet, add the ginger-garlic paste and sauté for a minute until fragrant.</li>
            <li>Add the chopped tomatoes, green chilies, and spices (turmeric powder, red chili powder, garam masala, cumin seeds, cloves, cardamom pods, cinnamon stick, and salt). Cook until the tomatoes are soft and oil starts to separate.</li>
            <li>Add the chicken pieces to the skillet and cook until they are no longer pink. Stir in the yogurt and cook for another 5 minutes.</li>
            <li>In a separate pot, bring water to a boil. Add the soaked rice and cook until it's 70% done. Drain the rice and set aside.</li>
            <li>In a large heavy-bottomed pot, layer half of the partially cooked rice at the bottom. Sprinkle half of the chopped cilantro and mint leaves on top.</li>
            <li>Spread the cooked chicken mixture evenly over the rice layer. Top it with the remaining rice and sprinkle the rest of the chopped cilantro and mint leaves.</li>
            <li>Drizzle some saffron-infused milk or yellow food color mixed with milk over the rice for a vibrant color and aroma (optional).</li>
            <li>Cover the pot with a tight-fitting lid and cook on low heat for 15-20 minutes until the rice is fully cooked and aromatic.</li>
            <li>Once done, fluff the biryani gently with a fork. Garnish with the reserved fried onions and serve hot with raita or salad.</li>
          </ol>
          </div>
          </div>
      <div className="recipe-actions">
        <button className="recipe" onClick={handlePrint}>
          Print Recipe
        </button>
        {/* Button to toggle comment visibility */}
        <h2>Leave a comment</h2>
        <CommentSection/>
      </div>
    </div>

  );
};

export default Biryani;