import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome To FoodCravings',
  description: 'Delicious food that will satisfy your cravings',
  keywords: 'food, cravings, cheap,breakfast, lunch, dinner',
};

export default Meta;
