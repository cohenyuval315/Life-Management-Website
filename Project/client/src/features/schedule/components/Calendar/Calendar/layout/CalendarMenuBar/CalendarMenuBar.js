import React from 'react'
import './CalendarMenuBar.css'
import '../../styles/MyCalendar.css'
import StyledButton from '../../../../../../../components/ui/Button/StyledButton'

const CalendarMenuBar = (props) => {

  const {
        viewModeOptions,
        onChangeSelect,
        selectedView,
        onClickNavi,
        selectedDateRangeText,
        isShowTaskViewCheckBox,
        handleCheckTaskView,
        isShowTaskView,
        handleCloseModal,
        handleOpenModal,
        } = props

  return (
              <div className='menu-container'>
                <select onChange={onChangeSelect} value={selectedView}>
                    {viewModeOptions.map((option, index) => (
                    <option value={option.value} key={index}>
                        {option.title}
                    </option>
                    ))}
                </select>

                <span id="menu-navi">
                    <button
                        type="button"
                        className="btn btn-default btn-sm move-today"
                        data-action="move-today"
                        onClick={onClickNavi}
                    >
                        Today
                    </button>

                    <button
                        style={{ marginLeft: "10px" }}
                        type="button"
                        className="btn btn-default btn-sm move-day"
                        data-action="move-prev"
                        onClick={onClickNavi}
                    >
                    <i
                        style={{pointerEvents:"none"}}
                        className="calendar-icon ic-arrow-line-left"
                        data-action="move-prev"
                    />
                    </button>
                    <button
                        style={{ marginLeft: "10px" }}
                        type="button"
                        className="btn btn-default btn-sm move-day"
                        data-action="move-next"
                        onClick={onClickNavi}
                    >
                    <i
                        style={{pointerEvents:"none"}}
                        className="calendar-icon ic-arrow-line-right"
                        data-action="move-next"
                    />
                    </button>

                </span>

                <span style={{ marginLeft: "10px" }} className="render-range">{selectedDateRangeText}</span>


                <div className="lnb-calendars-item" style={{display:"flex"}}>
                    <span className="render-range" style={{paddingLeft:"10px",paddingRight:"10px"}}>TaskView</span>
                    <input
                        type="checkbox"
                        value={isShowTaskViewCheckBox}
                        checked={isShowTaskView}
                        onChange={handleCheckTaskView}
                        style={{display:"flex"}}
                    />


                </div>
                <div>
                    <StyledButton name={"create calendar"} handleOnClick={()=>handleOpenModal("calendar")} styles={{}}/>
                    <StyledButton name={"create event"} handleOnClick={()=>handleOpenModal("createEvent")} styles={{}}/>
                    
                </div>
                <div>
                        collapseDuplicateEvents:
                        {/* <input
                        type="checkbox"
                        value={}
                        checked={isShowTaskView}
                        onChange={handleCheckTaskView}
                        style={{display:"flex"}}
                        /> */}
                </div>
                <div style={{width:"500px"}}>
                    height: under construction
                {/* <Slider 
                        key={`slider-${calendarHeight}`}
                        value={calendarHeight}  
                        onChange={handleHeightOnChange}
                        valueLabelDisplay="auto" 
                        min={500}
                        max={2000}
                    />  */}
                    {/* <StyledSlider 
                        initialValue={calendarHeight} 
                        handleChange={handleHeightOnChange}
                        min={500}
                        max={2000}
                        step={100}
                    /> */}
                </div>

            </div>
  )
}

export default CalendarMenuBar