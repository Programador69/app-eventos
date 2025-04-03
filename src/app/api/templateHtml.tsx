type DatosHtml = {
    nombreEvento: string,
    nombreInvitado: string,
    mensajeInvitados: string,
    fechaEvento: string,
    numeroAcompanantes: string,
    numeroMesa: string,
    idEvento: number,
    qrDataUrl: string
}

export function html({nombreEvento, nombreInvitado, mensajeInvitados, fechaEvento, numeroAcompanantes, numeroMesa, idEvento, qrDataUrl} : DatosHtml) {
    return `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitación - ${nombreEvento}</title>
    <style>
        /* Estilos generales */
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        
        /* Encabezado */
        .header {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 300;
            letter-spacing: 1px;
        }
        
        .header p {
            margin: 10px 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        
        /* Contenido principal */
        .content {
            padding: 30px;
            background-color: white;
        }
        
        .greeting {
            font-size: 20px;
            margin-bottom: 20px;
            color: #333;
        }
        
        .message {
            font-size: 16px;
            color: #555;
            margin-bottom: 25px;
            line-height: 1.7;
        }
        
        /* Detalles del evento */
        .event-details {
            background-color: #f5f7fa;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 25px;
        }
        
        .detail-row {
            display: flex;
            margin-bottom: 12px;
            align-items: center;
        }
        
        .detail-row:last-child {
            margin-bottom: 0;
        }
        
        .detail-icon {
            width: 20px;
            text-align: center;
            margin-right: 15px;
            color: #2575fc;
        }
        
        .detail-content {
            flex: 1;
        }
        
        .detail-label {
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #8795a1;
            margin-bottom: 3px;
        }
        
        .detail-value {
            font-size: 16px;
            color: #333;
        }
        
        /* Botón de confirmación */
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        
        .confirm-button {
            display: inline-block;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
        }
        
        .confirm-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        }
        
        /* Código QR */
        .qr-section {
            text-align: center;
            margin: 25px 0;
        }
        
        .qr-title {
            font-size: 14px;
            color: #8795a1;
            margin-bottom: 15px;
        }
        
        .qr-code {
            background-color: #f5f7fa;
            width: 150px;
            height: 150px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            border: 1px dashed #ddd;
            font-size: 12px;
            color: #8795a1;
        }
        
        /* Pie de página */
        .footer {
            background-color: #f5f7fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #8795a1;
            border-top: 1px solid #eaeaea;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .header {
                padding: 20px 15px;
            }
            
            .header h1 {
                font-size: 24px;
            }
            
            .content {
                padding: 20px;
            }
            
            .event-details {
                padding: 15px;
            }
            
            .greeting {
                font-size: 18px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>¡Estás Invitado!</h1>
            <p>${nombreEvento}</p>
        </div>
        
        <div class="content">
            <div class="greeting">Estimado/a ${nombreInvitado},</div>
            
            <div class="message">
                ${mensajeInvitados}
            </div>
            
            <div class="event-details">
                <div class="detail-row">
                    <div class="detail-icon">📅</div>
                    <div class="detail-content">
                        <div class="detail-label">Fecha</div>
                        <div class="detail-value">${fechaEvento}</div>
                    </div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-icon">👨‍👩‍👧‍👦</div>
                    <div class="detail-content">
                        <div class="detail-label">Acompañantes</div>
                        <div class="detail-value">${numeroAcompanantes} personas</div>
                    </div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-icon">🪑</div>
                    <div class="detail-content">
                        <div class="detail-label">Mesa Asignada</div>
                        <div class="detail-value">Mesa #${numeroMesa}</div>
                    </div>
                </div>
                
                <div class="detail-row">
                    <div class="detail-icon">🆔</div>
                    <div class="detail-content">
                        <div class="detail-label">ID del Evento</div>
                        <div class="detail-value">${idEvento}</div>
                    </div>
                </div>
            </div>
            
            <div class="qr-section">
                <div class="qr-title">Presenta este código al ingresar o recuerda el ID del evento:</div>
                <div class="qr-code">
                    <img src=${qrDataUrl} alt="Código QR del evento" width="150" height="150">
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>Tecnologia Hux</p>
            <p>© 2025 ${nombreEvento} - Todos los derechos reservados</p>
        </div>
    </div>
</body>
</html>`
}