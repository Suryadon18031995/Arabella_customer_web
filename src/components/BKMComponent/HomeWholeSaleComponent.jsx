import React from 'react';
import ProductCardComponent from './ProductCardComponent.jsx';
import Hydrangea from '../../assets/images/cat-image1.png';
import Alstroemeria from '../../assets/images/cat-image2.png';
import Roses from '../../assets/images/cat-image3.png';
import Carnations from '../../assets/images/cat-image4.png';
import Sunflowers from '../../assets/images/cat-image5.png';
import CutGreens from '../../assets/images/cat-image6.png';
import PomPoms from '../../assets/images/cat-image7.png';
import Lillies from '../../assets/images/cat-image8.png';
import FillerFlowers from '../../assets/images/cat-image9.png';
import GerberaDaisies from '../../assets/images/cat-image10.png';
import Mums from '../../assets/images/cat-image11.png';
import Delphinium from '../../assets/images/cat-image12.png';

const homeWholeSaleComponent = (props) => {
    return (
        <div className="hp-widget-row-name">
            <div className="hp-widget-line">
                <div className="hp-widget-title">
                    <h1 style={{ marginTop: '20px' }}>
                        <span>WHOLESALE FLOWERS</span>
                    </h1>
                </div>
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <ProductCardComponent name="Hydrangea" image={Hydrangea} catId={509} />
                <ProductCardComponent name="Alstroemeria" image={Alstroemeria} catId={431} />
                <ProductCardComponent name="Roses" image={Roses} catId={557} />
                <ProductCardComponent name="Carnations" image={Carnations} catId={453} />
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <ProductCardComponent name="Sunflowers" image={Sunflowers} catId={575} />
                <ProductCardComponent name="Cut Greens" image={CutGreens} catId={410} />
                <ProductCardComponent name="Pom Poms" image={PomPoms} catId={552} />
                <ProductCardComponent name="Lillies" image={Lillies} catId={522} />
            </div>
            <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                <ProductCardComponent name="Filler Flowers" image={FillerFlowers} catId={412} />
                <ProductCardComponent name="Gerbera Daisies" image={GerberaDaisies} catId={495} />
                <ProductCardComponent name="Mums" image={Mums} catId={532} />
                <ProductCardComponent name="Delphinium" image={Delphinium} catId={480} />
            </div>
        </div>
    );
}

export default homeWholeSaleComponent;
