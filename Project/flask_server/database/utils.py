def to_db_ids(arr):
    
    if isinstance(arr,list[object]):
        new_arr = []
        for item in arr:
            if isinstance(item['id'],str):
                new_arr.append(item.id)
            else:
                new_arr.append(None)
        return new_arr
    
    if isinstance(arr,list[str]):
        new_arr = []
        for item in arr:
            new_arr.append(item)
        return new_arr
    
    if isinstance(arr,object):
        return arr.id
    
    if isinstance(arr,str):
        return arr
    
    return arr

def to_db_values(arr,func):
    if isinstance(arr,list[str]):
        new_arr = []
        for item in arr:
            new_arr.append(func(item))
        return new_arr
    else:
        return arr
    
def to_db_value_from_id(arr,id):
    
    if not isinstance(arr,list[object]):    
        return False
    
    if not isinstance(id,str):
        return False
    
    for item in arr:
        if item['id'] == id:
            return item
        
    return None

def to_db_filter_by(arr:list,key:str,value:str,strict=False):
    if not key: 
        return arr
    new_arr = []
    for item in arr:
        if strict == False:
            if value in arr[key]:
                new_arr.append(item)
        else:
            if arr[key] == value:
                new_arr.append(item)            
    return new_arr
            
    