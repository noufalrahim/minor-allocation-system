import { useState } from "react";
import AllotmentCard from "../Cards/AllotmentCard";

interface DragAndDropProps {
    allCourses: any[];
    setAllCourses: any;
    widgets: any[];
    setWidgets: any;
}

export default function DragAndDrop({
    allCourses,
    setAllCourses,
    widgets,
    setWidgets,
}: DragAndDropProps) {

    const [draggedItem, setDraggedItem] = useState<any>(null);

    function handleOnDragStart(event: React.DragEvent, widgetType: any, index: number) {
        event.dataTransfer.setData('widget', JSON.stringify(widgetType));
        event.dataTransfer.setData('source', 'allCourses');
        setDraggedItem({ widgetType, index });
    }

    function handleWidgetDragStart(event: React.DragEvent, widget: any, index: number) {
        event.dataTransfer.setData('widget', JSON.stringify(widget));
        event.dataTransfer.setData('source', 'widgets');
        setDraggedItem({ widget, index });
    }

    function handleOnDrop(event: React.DragEvent) {
        event.preventDefault();
        const source = event.dataTransfer.getData('source');
        const widget = JSON.parse(event.dataTransfer.getData('widget'));

        if (source === 'allCourses') {
            setWidgets([...widgets, widget]);
            const newAllCourses = allCourses.filter((course) => course.name !== widget.name);
            setAllCourses(newAllCourses);
        } else if (source === 'widgets') {
            const updatedWidgets = [...widgets];
            updatedWidgets.splice(draggedItem.index, 1);
            setWidgets(updatedWidgets);
            setAllCourses([...allCourses, widget]);
        }
        setDraggedItem(null);
    }

    function handleWidgetDrop(event: React.DragEvent, targetIndex: number) {
        event.preventDefault();
        const source = event.dataTransfer.getData('source');
        const draggedWidget = JSON.parse(event.dataTransfer.getData('widget'));

        if (source === 'widgets') {
            const updatedWidgets = [...widgets];
            updatedWidgets.splice(draggedItem.index, 1);
            updatedWidgets.splice(targetIndex, 0, draggedWidget);
            setWidgets(updatedWidgets);
        }
        setDraggedItem(null);
    }

    function handleCourseDrop(event: React.DragEvent) {
        event.preventDefault();
        const source = event.dataTransfer.getData('source');
        const widget = JSON.parse(event.dataTransfer.getData('widget'));

        if (source === 'widgets') {
            // setAllCourses([...allCourses, widget]);
            allCourses.push(widget);
            const sortedAllCourses = allCourses.sort((a, b) => a.id - b.id);
            setAllCourses(sortedAllCourses);

            console.log("Dropped course", widget.name);
            const updatedWidgets = widgets.filter((course) => course.name !== widget.name);
            setWidgets(updatedWidgets);
        }
        setDraggedItem(null);
    }

    function handleDragOver(event: React.DragEvent) {
        event.preventDefault();
    }

    return (
        <div className={`dark:bg-[#1A202C] p-4 flex-row flex justify-center gap-10 w-[55rem] min-h-[35rem]`}>
            <div
                className="w-1/2 h-96"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
                <div className="flex flex-col dark:bg-gray-800 bg-[#A4B8FF] h-96 overflow-y-auto shadow-xl">
                    {widgets.length > 0 ? (
                        widgets.map((widget: any, index: any) => (
                            <div
                                className="py-2"
                                key={index}
                                draggable
                                onDragStart={(e) => handleWidgetDragStart(e, widget, index)}
                                onDrop={(e) => handleWidgetDrop(e, index)}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                <AllotmentCard
                                    course={widget}
                                    showRightIcon={true}
                                    showLeftIcon={false}
                                    onRightIconClick={() => {
                                        allCourses.push(widget);
                                        const newAllCourses = allCourses.sort((a, b) => a.id - b.id);
                                        setAllCourses(newAllCourses);
                                        const updatedWidgets = widgets.filter((course) => course.name !== widget.name);
                                        setWidgets(updatedWidgets);
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-full">
                            <p className="dark:text-[#808080] text-white text-center italic align-middle">
                                Drop your courses here
                            </p>
                        </div>
                    )}
                    
                </div>
                {
                    widgets.length > 0 && (
                        <div className="flex justify-center items-center mt-2">
                            <button
                                className="dark:bg-[#1F2937] bg-[#A4B8FF] text-white px-4 py-1 rounded-md"
                                onClick={() => {
                                    setWidgets([]);
                                    setAllCourses([...allCourses, ...widgets]);
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    )
                }
            </div>
            <div
                className="w-1/2 h-96"
                onDrop={handleCourseDrop}
                onDragOver={handleDragOver}
            >
                <div className="flex flex-col dark:bg-gray-800 bg-[#A4B8FF] h-96 overflow-y-auto shadow-xl">
                    {allCourses.map((widget: any, index: any) => (
                        <div
                            key={index}
                            className="dark:bg-[#1F2937] bg-[#A4B8FF] px-2 py-2 text-white cursor-pointer"
                            draggable
                            onDragStart={(e) => handleOnDragStart(e, widget, index)}
                        >
                            <AllotmentCard
                                course={widget}
                                showRightIcon={false}
                                showLeftIcon={true}
                                onLeftIconClick={() => {
                                    setWidgets([...widgets, widget]);
                                    const newAllCourses = allCourses.filter((course) => course.name !== widget.name);
                                    setAllCourses(newAllCourses);
                                }}
                            />
                        </div>
                    ))}
                    {allCourses.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <p className="dark:text-[#808080] text-white text-center italic align-middle">
                                No courses left
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
