from flask import Flask, request, jsonify
import torch
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
from diffusers.utils import export_to_video
import numpy as np

app = Flask(__name__)

pipe = DiffusionPipeline.from_pretrained("damo-vilab/text-to-video-ms-1.7b", torch_dtype=torch.float16, variant="fp16")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe.enable_model_cpu_offload()

@app.route('/generate_video', methods=['POST'])
def generate_video():
    prompt = request.json.get('prompt')
    output_video_path = "output_video.mp4"

    result = pipe(prompt, num_inference_steps=25)

    if hasattr(result, 'frames'):
        video_frames = result.frames
        if len(video_frames.shape) == 5 and video_frames.shape[0] == 1:
            video_frames = video_frames[0]

        if len(video_frames.shape) == 4 and video_frames.shape[3] in {3, 4}:
            video_frames = [np.array(frame) for frame in video_frames]
            export_to_video(video_frames, output_video_path=output_video_path)
            return jsonify({'video_path': output_video_path})

    return jsonify({'error': 'Error generating video'}), 500

if __name__ == '__main__':
    app.run(port=5001)
