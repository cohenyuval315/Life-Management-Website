import userfile from './jsons/UserFileData.json'

var filename = './jsons/UserFileData.json';
var userData = userfile

// fs.readFile('/client/src/data/jsons/UserFileData.json', function (err, data) {
//   if (err) throw err;
//   console.log(data);
// });

// function printFile(file) {
//   const reader = new FileReader();
//   reader.onload = (evt) => {
//     console.log(evt.target.result);
//   };
//   reader.readAsText(file);
// }

// printFile(filename)


function getUserData(){
    return userData;

}

function getCategoryItems(categoryOption) {
  return categoryOption.map((item) => ({
    ...item,
    hasChildren:
      userData.categoriesOptions.filter((i) => i.parentId === item.id).length > 0,
  }));

}

// function getCat(){
//     authFetch(`/category/categories`)
//         .then(r => r.json())
//         .then(data => {
//             setCategories(data.categories.map((item)=>{item["value"] = item["name"]; return item}).map((item) => ({
//                 ...item,
//                 hasChildren:
//                 data.categories.filter((i) => i.parent_id === item.id).length > 0,
//             })))
//         })
//     .catch(err=>console.log(err))
// }
async function getCate(group){

    const res = await fetch('/category/categories',{
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data)
  }).then((res)=>console.log(res.json())).then((res)=>res.json()).catch((err)=>console.log(err));

    return res
    
}

function getLastCategoriesId(){
    let lastId = -1;
    Object.entries(userData.categoriesOptions).map((categoryOptionArr)=>{
        Object.entries(categoryOptionArr[1]).map((categoryOption)=>{
            categoryOption[1].map((category)=>{
                if (category.id > lastId){
                    lastId = category.id
                }
            })

        })
    })
    return lastId
    
}

function getUserLastObjectId(){

    return userData.objects[userData.objects.length-1].id
}

function getUserCategories(){
    console.log(userData.categoriesOptions)
    return userData.categoriesOptions
}

function getUserMasterCategories(){
    return getCategoryItems(userData.categoriesOptions[0].master)
}

function getUserAmbivalentCategories(){
    return getCategoryItems(userData.categoriesOptions[1].ambivalent)
}

function getUserLaterCategories(){
    return getCategoryItems(userData.categoriesOptions[2].later)
}

function getUserTags(){
    return userData.tags;
}
function getUserFeatures(){
    return userData.features;
}
function getUserTagsByFeature(feature){
    const userTagsData = userData.tags.filter((tag)=>tag.features.includes(feature));
    return userTagsData;
}

function getUserAttributes(){
    return userData.attributes;
}

function getUserProperties(){
    return userData.properties;
}

function getUserDataByFeature(feature){
    const userObjectsData = userData.objects.filter((object)=>object.features.map((feature)=> feature.value).includes(feature));
    console.log(userObjectsData);
    return userObjectsData;
}

function getUserObjects(){
    return userData.objects
}



function updateUserObjects(objects){

}
function updateUserCategoryOptions(objects){

}
function updateUserData(){
    
}


export {getUserObjects,getUserData,getUserDataByFeature,getUserAttributes,getUserTags,getUserTagsByFeature,getUserProperties,getUserFeatures,getUserCategories,
getUserMasterCategories,
getUserAmbivalentCategories,
getUserLaterCategories,
getUserLastObjectId,
getLastCategoriesId

}