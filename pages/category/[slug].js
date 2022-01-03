import React from 'react';
import { useRouter } from 'next/router';
import Categories from '../../components/Categories';
import { getCategories, getCategoriesPost } from '../../services';
import {postCard,Categories,Loader} from '../...components'
const categoryPost = ({posts}) => { const router = useRouter(); if(router.isFallback){ return <Loader/>};
    console.log(posts);
    return (
        <div className="container mx-auto px-10 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
            {posts.map((post,index)=>(
                <postCard key={index}post={post.node}/>
            ))}

        </div>
        <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:strcky top-8">
                <Categories/>
            </div>
            </div>
            </div>
        </div>
    );
};

export default categoryPost


// lấy dữ liệu từ function getCategoriesPost;

export async function getStaticProps ({params}) {
    console.log("params", params);
    const posts = await getCategoriesPost(params.slug);

    return {
        props : {posts},
    };
    }
export async function getStaticPaths(){
    const Categories = await getCategories();
    return{
        paths:Categories.map(({slug})=>({params:{slug}})),
        fallback:true,
    };
}
