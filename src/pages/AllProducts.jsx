import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import { Link } from 'react-router'; // Fixed import
import ProductList from "../components/ProductList/ProductList";
import Banner from "../components/Banner/Banner";
import styled from 'styled-components';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi'; // Assuming you have react-icons

// Styled Components
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background-color: #fafafa;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #3498db;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  background-color: #f8f9fa;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1.5rem;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  height: 2.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 500;
  color: #6c757d;
  background-color: #e9ecef;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  margin-bottom: 0.8rem;
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-top: auto;
  margin-bottom: 1rem;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ViewButton = styled(Link)`
  background-color: #3498db;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const QuickActionButton = styled.button`
  background-color: white;
  color: #6c757d;
  border: 1px solid #e9ecef;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #3498db;
    border-color: #3498db;
  }
`;

const QuickActionsGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  appearance: none;
  background-color: white;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%;
  background-size: 0.8rem auto;
  min-width: 150px;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  min-width: 250px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const ProductCount = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  
  &:after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6c757d;
`;

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('default');
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Fetch products
    useEffect(() => {
        setLoading(true);
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                
                // Extract unique categories
                const uniqueCategories = [...new Set(res.data.map(product => product.category))];
                setCategories(uniqueCategories);
                
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    // Filter and sort products
    const filteredProducts = products
        .filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 product.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            switch(sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.title.localeCompare(b.title);
                case 'name-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

    return (
        <Wrapper>
            <Title>Featured Products</Title>
            <Banner />
            
            <FilterSection>
                <div>
                    <SearchInput 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Select 
                        value={selectedCategory} 
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </Select>
                    
                    <Select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Sort By: Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name-asc">Name: A to Z</option>
                        <option value="name-desc">Name: Z to A</option>
                    </Select>
                </div>
            </FilterSection>
            
            <ProductCount>{filteredProducts.length} products found</ProductCount>
            
            {loading ? (
                <LoadingSpinner />
            ) : filteredProducts.length > 0 ? (
                <Grid>
                    {filteredProducts.map((product) => (
                        <Card key={product.id}>
                            <ImageContainer>
                                <Image src={product.image} alt={product.title} />
                            </ImageContainer>
                            
                            <CardContent>
                                <CategoryBadge>
                                    {product.category}
                                </CategoryBadge>
                                <CardTitle>{product.title}</CardTitle>
                                <Price>${Number(product.price).toFixed(2)}</Price>
                                
                                <ActionsContainer>
                                    <ViewButton to={`/products/${product.id}`}>
                                        <FiEye size={16} /> View Details
                                    </ViewButton>
                                    
                                    <QuickActionsGroup>
                                        <QuickActionButton aria-label="Add to wishlist">
                                            <FiHeart size={14} />
                                        </QuickActionButton>
                                        <QuickActionButton aria-label="Add to cart">
                                            <FiShoppingCart size={14} />
                                        </QuickActionButton>
                                    </QuickActionsGroup>
                                </ActionsContainer>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            ) : (
                <NoProductsMessage>
                    No products found. Try adjusting your filters.
                </NoProductsMessage>
            )}
        </Wrapper>
    );
};

export default AllProducts;