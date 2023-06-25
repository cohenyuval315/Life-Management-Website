import React from 'react'
import CollapsibleTable from '../../../../components/ui/CollapsibleTable/CollapsibleTable';
import OverviewFlow from './Flow';
import NestedList from '../../../../components/ui/NestedList/NestedList';

const FlowCollection = () => {
  return (
    <div className='d-flex flex-row' style={{"width":"100%", "marginLeft": "auto", "marginRight": "auto"}}>
      <div style={{height: "600px", width: "1000px", border: "10px solid black", marginTop:"5%"}}><OverviewFlow/></div>
      <div style={{height: "50%", width: "25%", border: "1px solid black", marginTop:"5%"}}>
      <NestedList/>
      </div>
    </div>
  )
}
export default FlowCollection;

