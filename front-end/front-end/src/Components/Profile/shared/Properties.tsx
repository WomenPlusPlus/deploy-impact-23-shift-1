import Stack from '@mui/material/Stack';
import PropertyChip from '../../../UI/PropertyChip';
import AddPropertyChip from '../../../UI/AddPropertyChip';

type Props = {
    properties: any[];
    onAddProperty: Function;
    addButtonLabel?: string;
};

const Properties = ({ properties, onAddProperty, addButtonLabel }: Props) => {
    return (
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" mt={1}>
            {properties?.map((item: any) => (
                <PropertyChip label={item.name} />
            ))}
            <AddPropertyChip
                label={addButtonLabel ? addButtonLabel : 'Add'}
                onClick={() => onAddProperty()}
            />
        </Stack>
    );
};

export default Properties;
