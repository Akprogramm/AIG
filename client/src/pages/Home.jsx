import React, { useEffect, useState } from 'react'
import { Loader, Card, FormField } from '../components'

const RenderCards = ({ title, data }) => {
  if (data?.length > 0) return data.map((post) => <Card key={post._id} {...post} />)

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  ) 

} 

const Home = () => {

  const [loading, setLoading] = useState(false);  
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearchText = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value); 
     
    setTimeout(() => {
      const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
       setSearchResults(searchResult);
    }, 500); 

  }

  const fetchPosts = async () => {
    setLoading(true);
     
    try {
      const response = await fetch('https://aig-3.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className="font-extrabold text-gray-900 text-[32px]">The Community Showcase</h1>
        <p className='mt-2 text-gray-900 text-[16px] max-w-[500px]'>Browse through a collection of imaginative and visually stunning images generated by AI</p>
      </div>   


      <div className='mt-16'>
        <FormField 
         LabelName="Search posts"
         type="text"
         name="text"
         placeholder="Searh posts"
         value={searchText}
         handleChange={handleSearchText}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (<h2 className="font-medium text-[#666e75] text-xl mb-3">
              Showing result for <span className="text-[#222328]"></span>{searchText}
            </h2>
            )}

            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xsgrid-cold-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No search results found"  
                />) :
                (<RenderCards
                  data={allPosts}
                  title="No Posts results"
                />)}
            </div>

          </>
        )}
      </div>



    </section>
  )
}

export default Home
