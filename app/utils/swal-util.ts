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
}
