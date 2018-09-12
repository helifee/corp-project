import Picker from '@/plugins/element-ui/packages/date-picker/src/picker';
import DatePanel from '@/plugins/element-ui/packages/date-picker/src/panel/date';
import DateRangePanel from '@/plugins/element-ui/packages/date-picker/src/panel/date-range';

const getPanel = function(type) {
    if (type === 'daterange' || type === 'datetimerange') {
        return DateRangePanel;
    }
    return DatePanel;
};

export default {
    mixins: [Picker],

    name: 'ElDatePicker',

    props: {
        type: {
            type: String,
            default: 'date'
        },
        timeArrowControl: Boolean
    },

    watch: {
        type(type) {
            if (this.picker) {
                this.unmountPicker();
                this.panel = getPanel(type);
                this.mountPicker();
            } else {
                this.panel = getPanel(type);
            }
        }
    },

    created() {
        this.panel = getPanel(this.type);
    }
};
