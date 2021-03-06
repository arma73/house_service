import React, { FC } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Layout, Typography, Col, Row } from "antd";
import HomeHero from "./components/homehero";
import HomeListings from "./components/homelistings";
import HomeListingsSkeleton from "./components/homelistingsskeleton";
import { Listings as ListingsData, ListingsVariables, LISTINGS } from "../../lib/graphql/queries/listings";
import { ListingsFilter } from "../../lib/graphql/globalTypes"; 
import { displayErrorMessage } from "../../lib/utils/display";

import mapBackground from "../../assets/map-background.png";
import sanFranciscoImage from "../../assets/san-francisco.jpg";
import cancunImage from "../../assets/cancun.jpg";

const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

const Home: FC<RouteComponentProps> = ({ history }) => {
    const { data, loading } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
        "variables": {
            "filter": ListingsFilter.PRICE_HIGH_TO_LOW,
            "limit": PAGE_LIMIT,
            "page": PAGE_NUMBER,
        },
        "fetchPolicy": "cache-and-network",
    });
    const onSearch = (value: string) => {
        const trimmedValue = value.trim();

        if (trimmedValue) {
            history.push(`/listings/${trimmedValue}`);
        } else {
            displayErrorMessage("Please enter a valid search!");
        }
    };

    const renderListingsSection = () => {
        if (loading) {
            return <HomeListingsSkeleton />;
        }
        
        if (data) {
            return (
                <HomeListings title="Premium Listings" listings={data.listings.result} />
            );
        }

        return null;
    };

    return (
        <Layout.Content className="home" style={{ "backgroundImage": `url(${mapBackground})` }}>
            <HomeHero onSearch={onSearch} />
            <div className="home__cta-section">
                <Title level={2} className="home__cta-section-title">
                    Your guide for all things rental
                </Title>
                <Paragraph>
                    Helping you make the best decisions in renting your last minute locations.
                </Paragraph>
                <Link 
                    className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button" 
                    to="/listings/united%20states"
                >
                    Popular listings in the United States
                </Link>
            </div>
            {renderListingsSection()}
            <div className="home__listings">
                <Title level={4} className="home__listings-title">
                    Listings of any kind
                </Title>
                <Row gutter={12}>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/san%20francisco">
                            <div className="home__listings-img-cover">
                                <img 
                                    src={sanFranciscoImage} 
                                    alt="San Francisco" 
                                    className="home__listings-img" 
                                />
                            </div>
                        </Link>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Link to="/listings/cancún">
                            <div className="home__listings-img-cover">
                                <img 
                                    src={cancunImage} 
                                    alt="Cancún" 
                                    className="home__listings-img" 
                                />
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Layout.Content>
    );
};

export default Home;
