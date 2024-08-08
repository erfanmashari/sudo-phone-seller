// import React from "react";
// import Image from "next/image";

// // types
// import Product from "@/types/Product.type";

// import { BsImages, BsFlagFill } from "react-icons/bs";
// import { MdDelete } from "react-icons/md";

// type ImagesProps = {
//   images: any;
//   setImages: (value: any) => void;
//   formFields: Product;
//   changeFormFields: (
//     parameter: string,
//     value: string | boolean | object
//   ) => void;
// };

// const Images = ({
//   images,
//   setImages,
//   formFields,
//   changeFormFields,
// }: ImagesProps) => {
//   // upload images
//   const uploadImages = (files: any) => {
//     setImages(files);

//     const newImagesInfo = [];
//     for (const file of files) {
//       const imageObj: any = {
//         lastModified: file.lastModified,
//         lastModifiedDate: file.lastModifiedDate,
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         webkitRelativePath: file.webkitRelativePath,
//         url: URL.createObjectURL(file),
//         isCoverImage: false,
//       };

//       newImagesInfo.push(imageObj);
//     }
//     changeFormFields("images", newImagesInfo);
//   };

//   // change cover image
//   const changeCoverImage = (index: number) => {
//     const newImagesInfo = [...formFields.images];
//     for (const image of newImagesInfo) {
//       image.isCoverImage = false;
//     }
//     newImagesInfo[index].isCoverImage = true;
//     changeFormFields("images", newImagesInfo);
//   };

//   // delete one image
//   const deleteImage = (index: number) => {
//     const newImages = [...images];
//     const newImagesInfo = [...formFields.images];

//     newImages.splice(index, 1)
//     newImagesInfo.splice(index, 1)

//     setImages(newImages)
//     changeFormFields("images", newImagesInfo);
//   };

//   return (
//     <div className="w-full sm:w-6/12 flex flex-col justify-center items-center border border-gray-600 p-4 rounded-lg gap-4">
//       <h3 className="text-xl text-gray-600">آپلود عکس های محصول</h3>
//       <label
//         htmlFor="add-product-image-input"
//         className="border border-gray-400 cursor-pointer rounded-full p-3"
//       >
//         <BsImages className="w-8 h-8 text-gray-400" />
//       </label>
//       <input
//         onChange={(e) => uploadImages(e.target.files!)}
//         type="file"
//         name="add-product-image-input"
//         id="add-product-image-input"
//         className="hidden"
//         multiple={true}
//       />
//       <ul className="w-full h-32 flex flex-col border border-gray-400 rounded-lg overflow-y-scroll gap-3 p-4">
//         {formFields.images.map((image, index) => (
//           <li
//             key={index}
//             className={`w-full flex flex-row justify-between ${
//               formFields.images.length === index + 1
//                 ? "border-none"
//                 : "border-b"
//             } border-gray-400 pb-2.5`}
//           >
//             <div className=" flex flex-row gap-3">
//               <Image src={image.url} alt="image" width={80} height={80} />
//               <div className="flex flex-col justify-between">
//                 <label>{image.name}</label>
//                 <span>اندازه: {image.size}</span>
//               </div>
//             </div>
//             <div className="flex flex-row items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => changeCoverImage(index)}
//                 className={`w-fit h-fit border border-slate-400 ${
//                   image.isCoverImage
//                     ? "bg-slate-400 text-white"
//                     : "text-slate-400"
//                 } rounded-full p-1.5`}
//               >
//                 <BsFlagFill className="w-6 h-6" />
//               </button>
//               <button
//                 type="button"
//                 onClick={() => deleteImage(index)}
//                 className="w-fit h-fit border border-red-600 rounded-full p-1.5"
//               >
//                 <MdDelete className="w-6 h-6 text-red-600" />
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Images;
