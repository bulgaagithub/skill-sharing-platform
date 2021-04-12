import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import Link from "next/link";
import moment from "moment";
const GridItem = ({ article }) => {
  moment.locale("mn");
  return (
    <div className={`fj-card`}>
      <div className="card-body-wrapper">
        <div className="d-flex flex-row">
          <div>
            <Link href={`/${article.slug}`}>
              <a>
                <Card.Title className="font-weight-bold mb-1">
                  {article.title}
                </Card.Title>
              </a>
            </Link>
            <Card.Text>{article.summary}</Card.Text>
            <Card.Text className="card-date">
              {moment(article.createdAt).format("lll")} Нийтлэлч: {article.author?.name} <Badge variant="secondary" size="medium">{ article.category?.name }</Badge>
            </Card.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
