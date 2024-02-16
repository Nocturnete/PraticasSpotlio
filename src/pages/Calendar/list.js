import React, { useState, useEffect } from "react";
import Seo from "../../components/seo";
import Layout from "../../components/layout";
import axios from "axios";
import CustomTable from "../../components/calendar/table";
import ModalInfo from "../../components/calendar/modalInfo";
import ModalBookNow from "../../components/calendar/modalBookNow";
import { Link } from "gatsby";
import "../../styles/global.css";
import "../../styles/calendar.css";


const baseURL = "https://connect-dev.spotlio.com/yield-view/day";

const ListPage = () => {
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get('date');
  const [post, setPost] = useState();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    setLoading(true);
    createPost();
  }, [dateParam]);

  function createPost() {
    axios.post(baseURL, {
      "id": 3,
      "sessionId": "ac50779c-0722-4385-8919-7984b6f6b9b2",
      "productCategoryId": 117,
      "salesId": 3316173,
      "days": 1,
      "date": dateParam
    })
      .then((response) => {
        setPost(response.data.result);
        setLoading(false);
        // console.log("response:", response.data.result)
      })
  }

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalType("info");
  };

  const openModalBookNow = () => {
    setModalType("bookNow");
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <Layout pageTitle="My Calendar">
      <div className="my-3 flex justify-center py-2" >
        <p className="font-semibold py-1">
          Lift tickets, {new Date(dateParam).toLocaleDateString('es-ES')} <span className="font-light">for </span>1 day
        </p>
        <Link className="ml-6 items-center justify-center rounded-md bg-purple-500 flex px-2 font-semibold text-white hover:bg-red-600" to="/Calendar">
          <p className="text-sm">CHANGE SEARCH</p>
        </Link>
      </div>
      <CustomTable loading={loading} post={post} openModal={openModal} openModalBookNow={openModalBookNow} />
      <ModalInfo isOpen={modalType === "info"} onClose={closeModal}>
        {selectedProduct && (
          <>
            <h3>{selectedProduct.ProductName}</h3>
            <p>{selectedProduct.ProductDescription}</p>
          </>
        )}
      </ModalInfo>
      <ModalBookNow isOpen={modalType === "bookNow"} onClose={closeModal} />
    </Layout>
  );
};

export const Head = () => <Seo title="My Calendar" />;
export default ListPage;
