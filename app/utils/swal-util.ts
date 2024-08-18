import Swal, { SweetAlertOptions } from 'sweetalert2';

export class SwalUtil {
    static showConfirm(
        confirmCB: CallableFunction,
        cancelCB?: CallableFunction,
        options: SweetAlertOptions = {}
    ) {
        Swal.fire({
            background: '#171818',
            color: '#f2f2f2',
            iconColor: '#FF5861',
            title: 'Confirm Delete',
            text: 'Are you sure you want to delete this node ?',
            icon: 'warning',
            confirmButtonText: 'Yes, delete!',
            cancelButtonColor: '#100f13',
            confirmButtonColor: '#FF5861',
            showCancelButton: true,
            ...options
        }).then(result => {
            if (result.isConfirmed) {
                confirmCB();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (cancelCB) cancelCB();
            }
        });
    }
    static showReportModalWithTextArea(
        confirmCB: (textareaText: string) => void,
        cancelCB?: CallableFunction,
        options: SweetAlertOptions = {}
    ) {
        Swal.fire({
            background: '#171818',
            color: '#f2f2f2',
            iconColor: '#FF5861',
            title: 'Confirm Report',
            icon: 'warning',
            confirmButtonText: 'Yes, report!',
            cancelButtonColor: '#100f13',
            confirmButtonColor: '#FF5861',
            showCancelButton: true,
            html: '<textarea id="swal-textarea" class="swal2-textarea w-80 text-sm rounded-lg" placeholder="Type your reason here..."></textarea>',
            preConfirm: () => {
                const textarea = document.getElementById('swal-textarea') as HTMLTextAreaElement;
                return textarea.value;
            },
            ...options
        }).then(result => {
            if (result.isConfirmed) {
                confirmCB(result.value as string); // Pass the textarea text to the confirm callback
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (cancelCB) cancelCB();
            }
        });
    }
    static showEditGradeModalWithTextArea(
        confirmCB: (textareaText: string) => void,
        cancelCB?: CallableFunction,
        options: SweetAlertOptions = {}
    ) {
        Swal.fire({
            background: '#171818',
            color: '#f2f2f2',
            iconColor: '#50FA7B',
            title: 'Edit Grade',
            icon: 'success',
            confirmButtonText: 'confirm',
            cancelButtonColor: '#100f13',
            confirmButtonColor: '#50FA7B',
            showCancelButton: true,
            html: '<textarea id="swal-textarea" class="swal2-textarea w-80 text-sm rounded-lg" placeholder="grade"></textarea>',
            preConfirm: () => {
                const textarea = document.getElementById('swal-textarea') as HTMLTextAreaElement;
                return textarea.value;
            },
            ...options
        }).then(result => {
            if (result.isConfirmed) {
                confirmCB(result.value as string); // Pass the textarea text to the confirm callback
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                if (cancelCB) cancelCB();
            }
        });
    }
}
