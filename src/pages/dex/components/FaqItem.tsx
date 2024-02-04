import { Accordion } from "react-bootstrap";

function FagItems(props: any) {
    return (
            <Accordion.Item
                eventKey={props.eventKey}
                className="card bg-second mb-3 p-0">
                <Accordion.Header>
                    {props.title}
                </Accordion.Header>
                <Accordion.Body>
                    {props.text}
                </Accordion.Body>
            </Accordion.Item>
    );
}

export default FagItems;