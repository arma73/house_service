import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { formatListingPrice } from "../../utils/format";
import { iconColor } from "../../theme/color";

interface IProps {
    "listing": {
        "id": string;
        "title": string;
        "image": string;
        "address": string;
        "price": number;
        "numOfGuests": number;
    };
}

const { Text, Title } = Typography;

const ListingCard: FC<IProps> = ({ listing }) => {
    const { address, image, numOfGuests, price, title, id } = listing;

    return (
        <Link to={`/listing/${id}`}>
            <Card 
                hoverable 
                cover={
                    <div 
                        style={{ "backgroundImage": `url(${image})` }}
                        className="listing-card__cover-img"
                    />
                }
            >
                <div className="listing-card__details">
                    <div className="listing-card__description">
                        <Title level={4} className="listing-card__price">
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Title>
                        <Text strong ellipsis className="listing-card__title">
                            {title}
                        </Text>
                        <Text ellipsis className="listing-card__address">
                            {address}
                        </Text>
                    </div>
                    <div className="listing-card__dimensions listing-card__dimensions--guests">
                        <UserOutlined style={{ "color": iconColor }} />
                        <Text>{numOfGuests} guests</Text>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default ListingCard;
