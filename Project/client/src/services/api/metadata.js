import { apiRequest } from "./index"

export function getMetaData(){
    return apiRequest(true,'/api/v1/metadata/','GET',false,false).then(r=>r.json());
}
