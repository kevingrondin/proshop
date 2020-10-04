import React from "react"
import { Helmet } from "react-helmet"

const Meta = ({title, description, keywords}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywork" content={keywords} /> 
  </Helmet>
)

Meta.defaultProps = {
  title: 'Welcome to ProShop',
  description: 'We Sell the best products for cheap',
  keywords: 'electronics, buy electronics, cheap electronics'
}

export default Meta