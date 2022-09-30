import "@splidejs/react-splide/css";
import type { NextPage } from "next";
import SubHeading2 from "../components/Subheading/Subheading";
import useBook from "../hooks/useGetBooks";
import Carousel from "../components/carousel/Carousel";

const Home: NextPage = (props) => {
    const categories = ["Cookbooks", "Fantasy"];

    const categoryData = Object.fromEntries(
        categories.map((category) => [category, useBook({ category })])
    );

    const recentUploadsQuery = useBook({ orderBy: "createdAt" });

    return (
        <>
            {/* <Header /> */}

            <div className="pl-6">
                <h1>Home</h1>
                {/* <HomeSearchBar /> */}

                <section id="carousel">
                    <div key="0">
                        <SubHeading2>Recent Uploads</SubHeading2>
                        {recentUploadsQuery.isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <Carousel books={recentUploadsQuery.data} />
                        )}
                    </div>
                    {Object.entries(categoryData).map(
                        ([category, query], index) => {
                            return (
                                <div key={index + 1}>
                                    <SubHeading2>{category}</SubHeading2>
                                    {query.isLoading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        <Carousel books={query.data} />
                                    )}
                                </div>
                            );
                        }
                    )}
                </section>
            </div>
        </>
    );
};

export default Home;
