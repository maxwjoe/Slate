import React from "react";

function ArticleView() {
  return (

    <>
    <div className="flex flex-row w-full h-full bg-slate-dark">
      
      {/* Main Panel (Content) */}
      <div className="flex flex-col grow p-5">

        <div className="w-full h-12">
          <p className="text-xl font-bold text-text-main">Article Heading</p>
        </div>

        <div className="w-full grow">
          <p className="text-sm text-text-main">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus repudiandae, voluptatibus, quibusdam quia illo repellat deleniti vel facere vero fuga ea adipisci sit corporis id, iste reprehenderit? Autem quas reiciendis error nesciunt architecto quidem quae sapiente quo iure aperiam magnam optio, ut minus unde, ducimus voluptatibus, dolores nisi? Eligendi accusantium, exercitationem sit vitae iusto cumque quasi dolor impedit? Soluta, modi blanditiis? Aspernatur quae labore et recusandae sint? Deleniti, dolorum nisi? Debitis culpa quo minus provident sunt? Laudantium esse est neque ratione in quae voluptas illo quis, quod debitis vitae temporibus sapiente eius delectus doloremque rerum distinctio eaque! Commodi ex non eius architecto. Totam veniam dignissimos minus pariatur nostrum id. Natus commodi exercitationem vitae? Veniam, quo saepe fugiat ipsam doloremque laudantium.</p>
        </div>


      </div>

      {/* Right Panel (Stats and Mode Controls) */}
      <div className="flex flex-col w-1/3 h-full">
        <div className="flex flex-row h-12 justify-center items-center">
          <div className="flex justify-center items-center space-x-2 flex-row w-full h-full bg-text-danger rounded-md">
            <p>Edit</p>
            <p>Delete</p>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <div className="flex flex-row justify-between w-full">
            <p className="text-md text-text-secondary">Word Count</p>
            <p className="text-md text-text-secondary">24</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-md text-text-secondary">Words Saved</p>
            <p className="text-md text-text-secondary">12</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-md text-text-secondary">Comprehension</p>
            <p className="text-md text-text-secondary">50%</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-md text-text-secondary">Created At</p>
            <p className="text-md text-text-secondary">12/03/2034</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-md text-text-secondary">Updated At</p>
            <p className="text-md text-text-secondary">15/03/2034</p>
          </div>
        </div>

        <div>
          {/* Associated Word Lists (Beyond MVP) */}
        </div>

      </div>

    </div>
    
    
    </>

  );
}

export default ArticleView;
