import { useState } from "react";
import AllotmentCard from "../Cards/AllotmentCard";

interface DragAndDropProps {
    allCourses: any[];
    setAllCourses: any;
}

export default function DragAndDrop({
    allCourses,
    setAllCourses
}: DragAndDropProps) {
    const [widgets, setWidgets] = useState<any[]>([]);
    const [draggedItem, setDraggedItem] = useState<any>(null);

    function handleOnDragStart(event: React.DragEvent, widgetType: any, index: number) {
        console.log(widgetType);
        event.dataTransfer.setData('name', widgetType.name);
        event.dataTransfer.setData('code', widgetType.code);
        event.dataTransfer.setData('credits', widgetType.credits);
        event.dataTransfer.setData('department', widgetType.department);
        event.dataTransfer.setData('source', 'allCourses');
        setDraggedItem({ widgetType, index });
    }

    function handleOnDrop(event: React.DragEvent) {
        event.preventDefault();
        const source = event.dataTransfer.getData('source');
        const widget = {
            name: event.dataTransfer.getData('name'),
            code: event.dataTransfer.getData('code'),
            credits: event.dataTransfer.getData('credits'),
            department: event.dataTransfer.getData('department')
        };

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

    function handleDragOver(event: React.DragEvent) {
        event.preventDefault();
    }

    function handleWidgetDragStart(event: React.DragEvent, widget: any, index: number) {
        event.dataTransfer.setData('widget', JSON.stringify(widget));
        event.dataTransfer.setData('source', 'widgets');
        setDraggedItem({ widget, index });
    }

    function handleWidgetDrop(event: React.DragEvent, targetIndex: number) {
        event.preventDefault();
        const source = event.dataTransfer.getData('source');
        if (source === 'widgets') {
            const draggedWidget = JSON.parse(event.dataTransfer.getData('widget'));
            const updatedWidgets = [...widgets];
            updatedWidgets.splice(draggedItem.index, 1);
            updatedWidgets.splice(targetIndex, 0, draggedWidget);
            setWidgets(updatedWidgets);
        }
        setDraggedItem(null);
    }

    return (
        <div className="bg-[#1A202C] min-h-screen p-4 flex-row flex justify-center gap-10 w-[55rem]">
            <div
                className="bg-[#1F2937] p-4 h-96 text-white w-[25rem] overflow-y-auto w-1/2 shadow-xl"
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
            >
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
                            <AllotmentCard course={widget} />
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-[#808080] text-center italic align-middle">
                            Drop your courses here
                        </p>
                    </div>
                )}
            </div>
            <div className="w-1/2 h-96">
                <div className="flex flex-col bg-gray-800 h-96 overflow-y-auto shadow-xl">
                    {allCourses.map((widget: any, index: any) => (
                        <div
                            key={index}
                            className="bg-[#1F2937] px-2 py-2 text-white cursor-pointer"
                            draggable
                            onDragStart={(e) => handleOnDragStart(e, widget, index)}
                        >
                            <AllotmentCard course={widget} />
                        </div>
                    ))}
                    {allCourses.length === 0 && (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-[#808080] text-center italic align-middle">
                                No courses left
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
